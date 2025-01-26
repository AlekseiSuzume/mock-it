import { Injectable, Req, Res } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LogDto } from './models/log.Dto';
import { LogModel } from './models/log.model';

@Injectable()
export class LogService {
	constructor(private readonly db: DatabaseService) {}

	async create(
		@Req() request,
		requestTime: string,
		@Res() response,
		mock?: MockModel,
		responseBody?: string
	): Promise<LogDto> {
		let log: LogModel = {
			is_matched: mock !== undefined,
			mock_id: mock?.id,
			request_info: {
				method: request.method.toUpperCase(),
				mock_url: request.url,
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

		const logEntity = await this.db.log.create({
			data: {
				mock_url: log.request_info.mock_url,
				method: log.request_info.method,
				request_body: log.request_info.request_body,
				request_headers: log.request_info.request_headers,
				request_time: log.request_info.request_time,
				response_body: log.response_info.response_body,
				response_headers: log.response_info.response_headers,
				response_status: log.response_info.response_status,
				is_matched: log.is_matched,
				mock_id: log.mock_id
			}
		});

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
		const logEntities = await this.db.log.findMany();

		const logModels: LogDto[] = [];
		for (const logEntity of logEntities) {
			const logModel: LogDto = {
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
			logModels.push(logModel);
		}

		return logModels;
	}

	async deleteAll() {
		return this.db.log.deleteMany({});
	}
}
