import { LogEntity } from './log.entity';
import { LogDto } from './log.dto';

export default class LogMapper {
	static entityToDto(entity: LogEntity): LogDto {
		return {
			id: entity.id,
			is_matched: entity.is_matched,
			mock_id: entity.mock_id,
			request_info: {
				method: entity.request_info.method,
				request_body: entity.request_info.request_body,
				request_headers: entity.request_info.request_headers,
				request_time: entity.request_info.request_time,
				request_url: entity.request_info.request_url
			},
			response_info: {
				response_body: entity.response_info.response_body,
				response_headers: entity.response_info.response_headers,
				response_status: entity.response_info.response_status
			}
		};
	}

	static dtoToEntity(dto: LogDto): LogEntity {
		return {
			mock_id: dto.mock_id,
			is_matched: dto.is_matched,
			request_info: {
				method: dto.request_info.method,
				request_url: dto.request_info.request_url,
				request_body: dto.request_info.request_body,
				request_headers: dto.request_info.request_headers,
				request_time: dto.request_info.request_time
			},
			response_info: {
				response_body: dto.response_info.response_body,
				response_headers: dto.response_info.response_headers,
				response_status: dto.response_info.response_status
			}
		};
	}
}
