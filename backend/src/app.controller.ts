import { All, Controller, Req, Res } from '@nestjs/common';
import { MockService } from './mock/mock.service';

@Controller('/')
export class AppController {
	constructor(private readonly mockService: MockService) {}

	@All('*')
	async handleAllRequests(@Req() request, @Res() response) {
		return this.handler(request, response);
	}

	async handler(@Req() request, @Res() response) {
		const url = request.url;
		const method = request.method;

		const mocks: IMock[] = await this.mockService.findUrl(url);
		const urlMatchedMocks = mocks.filter((mock) => mock.url === url);
		const foundMock = urlMatchedMocks.find((mock) => mock.method === method);
		if (foundMock) {
			const responseBody = foundMock.body;
			const status = foundMock.status_code;

			return response.status(status).send(responseBody);
		} else {
			return response.status(200).send('mock not found');
		}
	}
}
