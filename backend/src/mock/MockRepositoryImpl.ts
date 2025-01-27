import { MockRepository } from './mock.repository';
import { MockDto } from './models/mock.dto';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MockRepositoryImpl implements MockRepository {
	constructor(private readonly db: DatabaseService) {}

	async create(mockDto: MockDto): Promise<MockModel> {
		return this.db.mock.create({
			data: {
				name: mockDto.name,
				url: mockDto.url,
				status_code: mockDto.status_code,
				method: mockDto.method,
				headers: mockDto.headers,
				body: mockDto.body,
				body_patterns: mockDto.body_patterns,
				matcher_type: mockDto.matcher_type,
				created_by_id: mockDto.created_by_id
			}
		});
	}

	async getOne(id: number): Promise<MockModel> {
		return this.db.mock.findFirst({
			where: {
				id: id
			}
		});
	}

	async getAll(): Promise<MockModel[]> {
		return this.db.mock.findMany();
	}

	async update(id: number, mockDto: MockDto): Promise<MockModel> {
		return this.db.mock.update({
			where: {
				id: id
			},
			data: mockDto
		});
	}

	async delete(id: number): Promise<void> {
		await this.db.mock.delete({
			where: {
				id: id
			}
		});
	}

	async findByUrl(url: string): Promise<MockModel[]> {
		return this.db.mock.findMany({
			where: {
				url: url
			}
		});
	}
}
