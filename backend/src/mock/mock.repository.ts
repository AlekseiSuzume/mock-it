import { MockEntity } from './models/mock.entity';

export interface MockRepository {
	create(mock: MockEntity): Promise<MockEntity>;

	getOne(id: number): Promise<MockEntity>;

	getAll(): Promise<MockEntity[]>;

	update(id: number, mockEntity: MockEntity): Promise<MockEntity>;

	delete(id: number): Promise<void>;

	findByUrl(url: string): Promise<MockEntity[]>;

	findUrlsStartsWith(url: string): Promise<MockEntity[]>;
}
