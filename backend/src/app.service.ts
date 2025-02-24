import {Injectable, Req} from '@nestjs/common';
import {MockService} from './mock/mock.service';
import {MockEntity} from './mock/models/mock.entity';
import {XMLParser} from 'fast-xml-parser';

@Injectable()
export class AppService {
    constructor(private readonly mockService: MockService) {
    }

    public async textRequestHandler(@Req() request): Promise<MockEntity> {
        const mocks: MockEntity[] = await this.findByURL(request);
        const mocksMatchMethod: MockEntity[] = await this.filterByMethod(request, mocks);

        return mocksMatchMethod[0];
    }

    public async queryRequestHandler(@Req() request, query: Map<string, any>): Promise<MockEntity> {
        const mocks: MockEntity[] = await this.findByURLWithoutQuery(request);
        const mocksMatchMethod: MockEntity[] = await this.filterByMethod(request, mocks);

        let result: MockEntity;
        mocksMatchMethod.forEach((mock) => {
            let matcher = mock.matcher_type;
            if (matcher === 'QUERY_TO_VALUE')
                if (this.isMatchQueryToKey(query, mock)) {
                    result = mock;
                }
        });

        console.log(result);

        if (result) {
            return result;
        }

        if (result === undefined) {
            mocksMatchMethod.forEach((mock) => {
                if (mock.matcher_type == 'NONE') {
                    result = mock;
                }
            });
        }

        return result;
    }

    public async XMLRequestHandler(@Req() request): Promise<MockEntity> {
        const mocks: MockEntity[] = await this.findByURL(request);
        const mocksMatchMethod: MockEntity[] = await this.filterByMethod(request, mocks);

        const parser = new XMLParser({ignoreAttributes: false});
        const requestBody = parser.parse(request.rawBody);

        let result: MockEntity;
        mocksMatchMethod.forEach((mock: MockEntity) => {
            let matcher = mock.matcher_type;

            const tempMock: MockEntity = {...mock}
            const requestObjs: Object = parser.parse(tempMock.body);
            tempMock.body = JSON.stringify(requestObjs);

            switch (matcher) {
                case 'KEY_TO_KEY': {
                    if (this.isMatchKeyToKey(requestBody, tempMock)) {
                        result = mock;
                    }
                    break;
                }
                case 'KEY_TO_VALUE': {
                    if (this.isMatchKeyToValue(requestBody, tempMock)) {
                        result = mock;
                    }
                    break;
                }
            }
        });

        //TODO добавить проверку на matcher, если есть только ответ с matcher, возвращать 404 при не совпадении
        if (result === undefined) {
            mocksMatchMethod.forEach((mock) => {
                if (mock.matcher_type == 'NONE') {
                    result = mock;
                }
            });
        }

        return result;
    }

    public async JSONRequestHandler(@Req() request): Promise<MockEntity> {
        const mocks: MockEntity[] = await this.findByURL(request);
        const mocksMatchMethod: MockEntity[] = await this.filterByMethod(request, mocks);
        const requestBody = JSON.parse(request.rawBody);

        let result: MockEntity;
        mocksMatchMethod.forEach((mock) => {
            let matcher = mock.matcher_type;
            switch (matcher) {
                case 'KEY_TO_KEY': {
                    if (this.isMatchKeyToKey(request, mock)) {
                        result = mock;
                    }
                    break;
                }
                case 'KEY_TO_VALUE': {
                    if (this.isMatchKeyToValue(requestBody, mock)) {
                        result = mock;
                    }
                    break;
                }
            }
        });

        //TODO добавить проверку на matcher, если есть только ответ с matcher, возвращать 404 при не совпадении
        if (result === undefined) {
            mocksMatchMethod.forEach((mock) => {
                if (mock.matcher_type == 'NONE') {
                    result = mock;
                }
            });
        }

        return result;
    }

    private async findByURL(@Req() request): Promise<MockEntity[]> {
        return await this.mockService.findUrl(request.url);
    }

    private async findByURLWithoutQuery(@Req() request): Promise<MockEntity[]> {
        const requestUrlWithoutQuery = request.url.toString().split('?')[0];
        return await this.mockService.findUrlsStartsWith(requestUrlWithoutQuery);
    }

    private async filterByMethod(@Req() request, mocks: MockEntity[]): Promise<MockEntity[]> {
        return mocks.filter((mock) => mock.method === request.method);
    }

    private isMatchKeyToKey(requestBody: Object, response: MockEntity): boolean {
        const jsonPathReq = response.body_patterns.split(',')[0];
        const jsonPathRes = response.body_patterns.split(',')[1];
        const jsonPathReqValue = this.getValueByPath(requestBody, jsonPathReq); // Получаем значение из первого JSON

        let isMatched;
        let responseBody;
        try {
            responseBody = JSON.parse(response.body);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
        }
        const jsonPathResValue = this.getValueByPath(responseBody, jsonPathRes); // Получаем значение из второго JSON
        // Сравниваем значения и выводим результат
        if (jsonPathReqValue !== undefined && jsonPathResValue !== undefined) {
            if (jsonPathReqValue === jsonPathResValue) {
                isMatched = true;
                console.log(`Значения совпадают: ${jsonPathReqValue}`);
            } else {
                console.log(`Значения не совпадают: ${jsonPathReqValue} и ${jsonPathResValue}`);
            }
        } else {
            console.log('Одно или оба значения не найдены');
        }

        return isMatched;
    }

    private getValueByPath(obj: object, path: string) {
        const keys = path.split('.').map((value) => value.trim());
        let current = obj;

        for (const key of keys) {
            if (current && key in current) {
                current = current[key];
            } else {
                return undefined;
            }
        }
        return current;
    }

    private isMatchKeyToValue(requestBody: Object, response: MockEntity): boolean {
        const jsonPath = response.body_patterns.split(',')[0];
        const keys = jsonPath.split('.').map((value) => value.trim());
        const jsonPathValue = response.body_patterns.split(',')[1].trim();

        const result = this.getValueFromKeys(requestBody, keys);
        let isMatched: boolean;
        if (result && result.toString() == jsonPathValue.toString()) {
            isMatched = true;
        }

        return isMatched;
    }

    private getValueFromKeys(obj: object, keys: string[]) {
        let current = obj;

        for (const key of keys) {
            // Проверяем, содержит ли ключ индекс массива
            const match = key.match(/^(.+)\[(\d+)\]$/);

            if (match) {
                // Если ключ содержит индекс массива
                const arrayKey = match[1]; // Название ключа
                const index = parseInt(match[2], 10); // Индекс

                // Проверяем, существует ли ключ и является ли он массивом
                if (current && arrayKey in current && Array.isArray(current[arrayKey])) {
                    current = current[arrayKey][index]; // Получаем элемент массива по индексу
                } else {
                    return undefined;
                }
            } else {
                // Если ключ не содержит индекс массива
                if (current && key in current) {
                    current = current[key];
                } else {
                    return undefined;
                }
            }
        }

        return current;
    }

    private isMatchQueryToKey(queryMap: Map<string, any>, response: MockEntity): boolean {
        const queryKey = response.body_patterns.split(',')[0];
        const queryValue = response.body_patterns.split(',')[1];

        if (queryMap.has(queryKey)) {
            return queryMap.get(queryKey) === queryValue;
        }
        return false;
    }
}
