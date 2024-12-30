import { All, Controller, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LogService } from './log/log.service';
import { isValidJSON, isValidXML } from './utils/Validators';
import { converter } from './utils/Converters';

@Controller('/')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly logService: LogService
	) {}

	@All('*')
	async handleAllRequests(@Req() request, @Res() response): Promise<IMock> {
		const requestTime = converter.toISOString(new Date());

		let mock: IMock;
		if (isValidJSON(request.body)) {
			mock = await this.appService.JSONHandler(request);
		} else if (isValidXML(request.body)) {
			//TODO XML Request handler
			mock = response.status(419);
		} else {
			//TODO TEXT Request handler
			mock = response.status(419);
		}

		let status;
		let responseBody;
		let responseHeaders;

		if (mock) {
			status = mock.status_code;
			responseBody = mock.body;
			responseHeaders = mock.headers;
		} else {
			status = HttpStatus.PRECONDITION_FAILED;
			responseBody = 'Unable to find mock';
		}

		response.status(status);
		response.headers(responseHeaders ? JSON.parse(responseHeaders) : '');
		response.send(responseBody);

		await this.logService.logging(request, requestTime, response, mock);

		return response;
	}
}
