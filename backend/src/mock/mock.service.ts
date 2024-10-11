import { Injectable } from '@nestjs/common';
import { MockDto } from './dto/mock.dto';
import { DatabaseService } from '../database/database.service';
import { Mock } from '@prisma/client';

@Injectable()
export class MockService {
	constructor(private readonly db: DatabaseService) {}

	async create(mockDto: MockDto): Promise<IMock> {
		return this.db.mock.create({
			data: {
				name: mockDto.name,
				url: mockDto.url,
				method: mockDto.method,
				status_code: mockDto.status_code,
				body: mockDto.body,
				headers: mockDto.headers,
				body_patterns: mockDto.bodyPatterns
			}
		});
	}

	async getAll(): Promise<IMock[]> {
		return this.db.mock.findMany();
	}

	async getOne(id: number): Promise<IMock> {
		return this.db.mock.findFirst({
			where: {
				id: id
			}
		});
	}

	async update(id: number, mockDto: MockDto): Promise<IMock> {
		return this.db.mock.update({
			where: {
				id: id
			},
			data: mockDto
		});
	}

	delete(id: number): Promise<IMock> {
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
