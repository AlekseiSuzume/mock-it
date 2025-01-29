import { Injectable } from '@nestjs/common';
import { LogRepository } from './Log.repository';
import { DatabaseService } from '../database/database.service';
import { LogEntity } from './models/log.entity';

@Injectable()
export class LogRepositoryImpl implements LogRepository {
	constructor(private readonly db: DatabaseService) {}

	async insert(log: LogEntity): Promise<void> {
		await this.db.log.create({
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

	async getAll(): Promise<LogEntity[]> {
		const result = await this.db.log.findMany();

		const logEntities: LogEntity[] = [];
		for (const item of result) {
			const entity: LogEntity = {
				id: item.id,
				is_matched: item.is_matched,
				mock_id: item.mock_id,
				request_info: {
					method: item.method,
					request_url: item.mock_url,
					request_body: item.request_body,
					request_headers: item.request_headers,
					request_time: item.request_time
				},
				response_info: {
					response_body: item.response_body,
					response_headers: item.response_headers,
					response_status: item.response_status
				}
			};
			logEntities.push(entity);
		}

		return logEntities;
	}

	async deleteAll(): Promise<void> {
		this.db.log.deleteMany({});
	}
}
