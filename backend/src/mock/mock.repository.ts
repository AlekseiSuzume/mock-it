import { MockDto } from './models/mock.dto';

export interface MockRepository {
	create(mockDto: MockDto): Promise<MockModel>;

	getOne(id: number): Promise<MockModel>;

	getAll(): Promise<MockModel[]>;

	update(id: number, mockDto: MockDto): Promise<MockModel>;

	delete(id: number): Promise<void>;

	findByUrl(url: string): Promise<MockModel[]>;
}
