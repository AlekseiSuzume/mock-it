import { Inject, Injectable } from '@nestjs/common';
import { MockDto } from './models/mock.dto';
import { MockRepository } from './mock.repository';

@Injectable()
export class MockService {
	constructor(@Inject('MockRepository') private repository: MockRepository) {}

	async create(mockDto: MockDto): Promise<MockModel> {
		return this.repository.create(mockDto);
	}

	async getOne(id: number): Promise<MockModel> {
		return this.repository.getOne(id);
	}

	async getAll(): Promise<MockModel[]> {
		return this.repository.getAll();
	}

	async update(id: number, mockDto: MockDto): Promise<MockModel> {
		return this.repository.update(id, mockDto);
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id);
	}

	async findUrl(url: string): Promise<MockModel[]> {
		return this.repository.findByUrl(url);
	}
}
