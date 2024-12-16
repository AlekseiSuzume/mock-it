import { Injectable, Req, Res } from '@nestjs/common';
import { MockService } from './mock/mock.service';

@Injectable()
export class AppService {
	constructor(private readonly mockService: MockService) {}

	public async handler(@Req() request, @Res() response): Promise<IMock> {
		const mocks: IMock[] = await this.findByURL(request);
		const mocksMatchMethod: IMock[] = await this.filterByMethod(request, mocks);
		const keyValueMatched = this.findKeyValuePair(request, mocksMatchMethod);

		if (keyValueMatched) {
			const responseBody = keyValueMatched.body;
			const status = keyValueMatched.status_code;

			return response.status(status).send(responseBody);
		}

		if (mocksMatchMethod) {
			const responseBody = mocksMatchMethod[0].body;
			const status = mocksMatchMethod[0].status_code;

			return response.status(status).send(responseBody);
		} else {
			return response.status(200).send('mock not found');
		}
	}

	findKeyValuePair(@Req() request, responses: IMock[]): IMock {
		const requestBody = JSON.parse(request.rawBody);
		let result: IMock;
		responses.forEach((response) => {
			let responseBody;
			try {
				responseBody = JSON.parse(response.body);
			} catch (e) {
				console.error('Ошибка парсинга JSON:', e);
			}

			if (response.body_patterns) {
				const entries = Object.entries(JSON.parse(response.body_patterns));
				const key = entries[0][0];
				if (responseBody.hasOwnProperty(key)) {
					if (responseBody[key] == requestBody[key]) {
						result = response;
					}
				}
			}
		});
		return result;
	}

	private async findByURL(@Req() request): Promise<IMock[]> {
		return await this.mockService.findUrl(request.url);
	}

	private async filterByMethod(@Req() request, mocks: IMock[]): Promise<IMock[]> {
		return mocks.filter((mock) => mock.method === request.method);
	}
}
