import { Inject, Injectable, Req, Res } from '@nestjs/common';
import { LogDto } from './models/log.Dto';
import { LogRepository } from './Log.repository';
import { LogEntity } from './models/log.entity';
import LogMapper from './models/log.mapper';

@Injectable()
export class LogService {
	constructor(@Inject('LogRepository') private repository: LogRepository) {}

	async create(
		@Req() request,
		requestTime: string,
		@Res() response,
		mock?: MockModel,
		responseBody?: string
	): Promise<void> {
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

		const logEntity: LogEntity = LogMapper.dtoToEntity(logDto);
		await this.repository.insert(logEntity);
	}

	async getAll(): Promise<LogDto[]> {
		const logEntities: LogEntity[] = await this.repository.getAll();
		return logEntities.map((entity: LogEntity) => LogMapper.entityToDto(entity));
	}

	async deleteAll(): Promise<void> {
		return this.repository.deleteAll();
	}
}
