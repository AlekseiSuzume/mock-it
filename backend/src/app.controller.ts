import { All, Controller, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LogService } from './log/log.service';
import { converter } from './utils/Converters';
import { sleep } from './utils/Sleep';
import { isValidJSON, isValidXML } from './utils/Validators';

@Controller('/')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly logService: LogService
	) {}

	@All('*')
	async handleAllRequests(@Req() request, @Res() response): Promise<any> {
		const requestTime = converter.toISOString(new Date());

		// Задержка для парсинга request.rawBody
		await sleep(1);

		let mock: MockModel;
		if (isValidJSON(request.rawBody)) {
			mock = await this.appService.JSONRequestHandler(request);
		} else if (isValidXML(request.rawBody)) {
			mock = await this.appService.XMLRequestHandler(request);
		} else {
			mock = await this.appService.textRequestHandler(request);
		}

		let status;
		let responseBody;
		let responseHeaders;

		if (mock) {
			status = mock.status_code;
			responseBody = mock.body;
			responseHeaders = mock.headers;
		} else {
			status = HttpStatus.NOT_FOUND;
			responseBody = 'Request not matched';
		}

		response.status(status);
		response.headers(responseHeaders ? JSON.parse(responseHeaders) : '');
		response.send(responseBody);

		await this.logService.create(request, requestTime, response, mock, responseBody);

		return response;
	}
}
