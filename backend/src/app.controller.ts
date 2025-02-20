import { All, Controller, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LogService } from './log/log.service';
import { converter } from './utils/Converters';
import { sleep } from './utils/Sleep';
import { isValidJSON, isValidXML } from './utils/Validators';
import { MockEntity } from './mock/models/mock.entity';

@Controller('/')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly logService: LogService
	) {}

	@All('*')
	async handleAllRequests(@Req() request, @Query() query, @Res() response): Promise<any> {
		const requestTime = converter.toISOString(new Date());

		const queryMap = new Map<string, any>(Object.entries(query));

		// Задержка для парсинга request.rawBody
		await sleep(1);

		let mock: MockEntity;
		if (Object.keys(query).length !== 0) {
			mock = await this.appService.queryRequestHandler(request, queryMap);
		} else if (isValidJSON(request.rawBody)) {
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
