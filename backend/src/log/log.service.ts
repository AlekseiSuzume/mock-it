import { Inject, Injectable, Req, Res } from '@nestjs/common';
import { LogDto } from './models/log.Dto';
import { Log } from '@prisma/client';
import { LogRepository } from './Log.repository';

@Injectable()
export class LogService {
	constructor(@Inject('LogRepository') private repository: LogRepository) {}

	async create(
		@Req() request,
		requestTime: string,
		@Res() response,
		mock?: MockModel,
		responseBody?: string
	): Promise<LogDto> {
		let logDto: LogDto = {
			is_matched: mock !== undefined,
			mock_id: mock?.id,
			request_info: {
				method: request.method.toUpperCase(),
				request_url: request.url,
				request_body: request.rawBody.toString(),
				request_headers: JSON.stringify(response.request.raw.headers),
				request_time: requestTime
			},
			response_info: {
				response_body: mock?.body ?? responseBody,
				response_headers: mock?.headers ?? '',
				response_status: response.statusCode
			}
		};

		const logEntity: Log = await this.repository.insert(logDto);

		const result: LogDto = {
			id: logEntity.id,
			is_matched: logEntity.is_matched,
			request_info: {
				method: logEntity.method,
				request_url: logEntity.mock_url,
				request_body: logEntity.request_body,
				request_headers: logEntity.request_headers,
				request_time: logEntity.request_time
			},
			response_info: {
				response_body: logEntity.response_body,
				response_headers: logEntity.response_headers,
				response_status: logEntity.response_status
			}
		};

		return result;
	}

	async getAll(): Promise<LogDto[]> {
		return this.repository.getAll();
	}

	async deleteAll() {
		return this.repository.deleteAll();
	}
}
