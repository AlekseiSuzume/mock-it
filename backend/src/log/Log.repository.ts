import { LogEntity } from './models/log.entity';

export interface LogRepository {
	insert(log: LogEntity): Promise<void>;
	getAll(): Promise<LogEntity[]>;
	deleteAll(): Promise<void>;
}
