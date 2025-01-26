import { LogDto } from './models/log.Dto';
import { Log } from '@prisma/client';

export interface LogRepository {
	insert(log: LogDto): Promise<Log>;
	getAll(): Promise<LogDto[]>;
	deleteAll(): Promise<void>;
}
