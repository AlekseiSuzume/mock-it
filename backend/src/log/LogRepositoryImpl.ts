import { Injectable } from '@nestjs/common';
import { LogRepository } from './Log.repository';
import { DatabaseService } from '../database/database.service';
import { LogDto } from './models/log.Dto';
import { Log } from '@prisma/client';

@Injectable()
export class LogRepositoryImpl implements LogRepository {
	constructor(private readonly db: DatabaseService) {}

	async insert(log: LogDto): Promise<Log> {
		return this.db.log.create({
			data: {
				mock_url: log.request_info.request_url,
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

	async deleteAll(): Promise<void> {
		this.db.log.deleteMany({});
	}
}
