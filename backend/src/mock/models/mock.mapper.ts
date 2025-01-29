import { MockDto } from './mock.dto';
import { MockEntity } from './mock.entity';

export default class MockMapper {
	static dtoToEntity(dto: MockDto): MockEntity {
		return {
			name: dto.name,
			url: dto.url,
			status_code: dto.status_code,
			method: dto.method,
			headers: dto.headers,
			body: dto.body,
			body_patterns: dto.body_patterns,
			matcher_type: dto.matcher_type,
			created_by_id: dto.created_by_id
		};
	}

	static entityToDto(entity: MockEntity): MockDto {
		return {
			id: entity.id,
			name: entity.name,
			url: entity.url,
			status_code: entity.status_code,
			headers: entity.headers,
			method: entity.method,
			body: entity.body,
			body_patterns: entity.body_patterns,
			matcher_type: entity.matcher_type,
			created_by_id: entity.created_by_id
		};
	}
}
