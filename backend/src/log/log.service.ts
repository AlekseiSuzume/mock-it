import { Injectable, Req, Res } from '@nestjs/common';
import { ILog } from './ILog';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LogService {
	constructor(private readonly db: DatabaseService) {}

	async logging(
		@Req() request,
		requestTime: string,
		@Res() response,
		mock?: IMock
	): Promise<ILog> {
		let log: ILog = {
			method: request.method.toUpperCase(),
			mockUrl: request.url,
			request_body: request.rawBody,
			request_headers: JSON.stringify(response.request.raw.headers),
			request_time: requestTime,
			response_body: mock?.body,
			response_headers: mock?.headers ?? '',
			response_status: response.statusCode,
			is_matched: mock !== undefined
		};

		return this.db.log.create({
			data: {
				mock_url: log?.mockUrl,
				method: log.method,
				request_body: log.request_body,
				request_headers: log.request_headers,
				request_time: log.request_time,
				response_body: log.response_body,
				response_headers: log.response_headers,
				response_status: log.response_status,
				mock_id: mock?.id,
				is_matched: log.is_matched
			}
		});
	}

	getAll(): Promise<ILog[]> {
		return this.db.log.findMany();
	}
}
