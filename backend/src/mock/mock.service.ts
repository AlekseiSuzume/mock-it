import { Inject, Injectable } from '@nestjs/common';
import { MockDto } from './models/mock.dto';
import { MockEntity } from './models/mock.entity';
import { MockRepository } from './mock.repository';
import MockMapper from './models/mock.mapper';

@Injectable()
export class MockService {
	constructor(@Inject('MockRepository') private repository: MockRepository) {}

	async create(mockDto: MockDto): Promise<MockDto> {
		const entity: MockEntity = MockMapper.dtoToEntity(mockDto);
		const createResult: MockEntity = await this.repository.create(entity);
		return MockMapper.entityToDto(createResult);
	}

	async getOne(id: number): Promise<MockDto> {
		const getResult: MockEntity = await this.repository.getOne(id);
		return MockMapper.entityToDto(getResult);
	}

	async getAll(): Promise<MockDto[]> {
		const getResult: MockEntity[] = await this.repository.getAll();
		return getResult.map((entity) => MockMapper.entityToDto(entity));
	}

	async update(id: number, mockDto: MockDto): Promise<MockDto> {
		const entity: MockEntity = MockMapper.dtoToEntity(mockDto);
		const createResult: MockEntity = await this.repository.update(id, entity);
		return MockMapper.entityToDto(createResult);
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete(id);
	}

	async findUrl(url: string): Promise<MockDto[]> {
		const createResult: MockEntity[] = await this.repository.findByUrl(url);
		return createResult.map((entity) => MockMapper.entityToDto(entity));
	}

	async findUrlsStartsWith(url: string): Promise<MockDto[]> {
		const createResult: MockEntity[] = await this.repository.findUrlsStartsWith(url);
		return createResult.map((entity) => MockMapper.entityToDto(entity));
	}
}
