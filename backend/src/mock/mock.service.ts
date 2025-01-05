import { Injectable } from '@nestjs/common';
import { MockDto } from './models/mock.dto';
import { DatabaseService } from '../database/database.service';
import { Mock } from '@prisma/client';

@Injectable()
export class MockService {
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
				body_patterns: mockDto.bodyPatterns,
				matcher_type: mockDto.matcherType,
				created_by_id: mockDto.created_by_id
			}
		});
	}

	async getAll(): Promise<MockModel[]> {
		return this.db.mock.findMany();
	}

	async getOne(id: number): Promise<MockModel> {
		return this.db.mock.findFirst({
			where: {
				id: id
			}
		});
	}

	async update(id: number, mockDto: MockDto): Promise<MockModel> {
		return this.db.mock.update({
			where: {
				id: id
			},
			data: mockDto
		});
	}

	delete(id: number): Promise<MockModel> {
		return this.db.mock.delete({
			where: {
				id: id
			}
		});
	}

	findUrl(url: string): Promise<Mock[]> {
		return this.db.mock.findMany({
			where: {
				url: url
			}
		});
	}
}
