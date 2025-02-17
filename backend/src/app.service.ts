import { Injectable, Req } from '@nestjs/common';
import { MockService } from './mock/mock.service';
import { MockEntity } from './mock/models/mock.entity';

@Injectable()
export class AppService {
	constructor(private readonly mockService: MockService) {}

	public async textRequestHandler(@Req() request): Promise<MockEntity> {
		const mocks: MockEntity[] = await this.findByURL(request);
		const mocksMatchMethod: MockEntity[] = await this.filterByMethod(request, mocks);

		return mocksMatchMethod[0];
	}

	public async XMLRequestHandler(@Req() request): Promise<MockEntity> {
		const mocks: MockEntity[] = await this.findByURL(request);
		const mocksMatchMethod: MockEntity[] = await this.filterByMethod(request, mocks);

		return mocksMatchMethod[0];
	}

	public async JSONRequestHandler(@Req() request): Promise<MockEntity> {
		const mocks: MockEntity[] = await this.findByURL(request);
		const mocksMatchMethod: MockEntity[] = await this.filterByMethod(request, mocks);

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
					if (this.isMatchKeyToValue(request, mock)) {
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

	private async filterByMethod(@Req() request, mocks: MockEntity[]): Promise<MockEntity[]> {
		return mocks.filter((mock) => mock.method === request.method);
	}

	private isMatchKeyToKey(@Req() request, response: MockEntity): boolean {
		const jsonPathReq = response.body_patterns.split(',')[0];
		const jsonPathRes = response.body_patterns.split(',')[1];
		const requestBody = JSON.parse(request.rawBody);
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

	private isMatchKeyToValue(@Req() request, response: MockEntity): boolean {
		const jsonPath = response.body_patterns.split(',')[0];
		const keys = jsonPath.split('.').map((value) => value.trim());
		const jsonPathValue = response.body_patterns.split(',')[1].trim();
		const requestBody = JSON.parse(request.rawBody);

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
			if (current && key in current) {
				current = current[key];
			} else {
				return undefined;
			}
		}
		return current;
	}
}
