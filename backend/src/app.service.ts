import { Injectable, Req } from '@nestjs/common';
import { MockService } from './mock/mock.service';

@Injectable()
export class AppService {
	constructor(private readonly mockService: MockService) {}

	public async JSONRequestHandler(@Req() request): Promise<MockModel> {
		const mocks: MockModel[] = await this.findByURL(request);
		const mocksMatchMethod: MockModel[] = await this.filterByMethod(request, mocks);

		let result: MockModel;
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

		if (result === undefined) {
			result = mocksMatchMethod[0];
		}

		return result;
	}

	private async findByURL(@Req() request): Promise<MockModel[]> {
		return await this.mockService.findUrl(request.url);
	}

	private async filterByMethod(@Req() request, mocks: MockModel[]): Promise<MockModel[]> {
		return mocks.filter((mock) => mock.method === request.method);
	}

	private isMatchKeyToKey(@Req() request, response: MockModel): boolean {
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

	private isMatchKeyToValue(@Req() request, response: MockModel): boolean {
		const jsonPath = response.body_patterns.split(',')[0];
		const keys = jsonPath.split('.').map((value) => value.trim());
		const jsonPathValue = response.body_patterns.split(',')[1].trim();
		const requestBody = JSON.parse(request.rawBody);

		const result = this.getValueFromKeys(requestBody, keys);
		let isMatched: boolean;
		if (result.toString() == jsonPathValue.toString()) {
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
