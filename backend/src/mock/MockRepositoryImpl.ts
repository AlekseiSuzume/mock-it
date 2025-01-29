import { MockRepository } from './mock.repository';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { MockEntity } from './models/mock.entity';

@Injectable()
export class MockRepositoryImpl implements MockRepository {
	constructor(private readonly db: DatabaseService) {}

	async create(entity: MockEntity): Promise<MockEntity> {
		return this.db.mock.create({
			data: {
				name: entity.name,
				url: entity.url,
				status_code: entity.status_code,
				method: entity.method,
				headers: entity.headers,
				body: entity.body,
				body_patterns: entity.body_patterns,
				matcher_type: entity.matcher_type,
				created_by_id: entity.created_by_id
			}
		});
	}

	async getOne(id: number): Promise<MockEntity> {
		return this.db.mock.findFirst({
			where: {
				id: id
			}
		});
	}

	async getAll(): Promise<MockEntity[]> {
		return this.db.mock.findMany();
	}

	async update(id: number, entity: MockEntity): Promise<MockEntity> {
		return this.db.mock.update({
			where: {
				id: id
			},
			data: entity
		});
	}

	async delete(id: number): Promise<void> {
		await this.db.mock.delete({
			where: {
				id: id
			}
		});
	}

	async findByUrl(url: string): Promise<MockEntity[]> {
		return this.db.mock.findMany({
			where: {
				url: url
			}
		});
	}
}
