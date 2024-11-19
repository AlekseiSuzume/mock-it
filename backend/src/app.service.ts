import { Injectable, Req, Res } from '@nestjs/common';
import { MockService } from './mock/mock.service';

@Injectable()
export class AppService {
	constructor(private readonly mockService: MockService) {}

	public async handler(@Req() request, @Res() response): Promise<IMock> {
		const mocks: IMock[] = await this.findByURL(request);
		const mocksMatchMethod: IMock[] = await this.filterByMethod(request, mocks);

		if (mocksMatchMethod && mocksMatchMethod.length == 1) {
			const responseBody = mocksMatchMethod[0].body;
			const status = mocksMatchMethod[0].status_code;

			return response.status(status).send(responseBody);
		} else {
			return response.status(200).send('mock not found');
		}
	}

	private async findByURL(@Req() request): Promise<IMock[]> {
		return await this.mockService.findUrl(request.url);
	}

	private async filterByMethod(@Req() request, mocks: IMock[]): Promise<IMock[]> {
		return mocks.filter((mock) => mock.method === request.method);
	}
}
