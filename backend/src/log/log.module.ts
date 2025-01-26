import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogRepositoryImpl } from './LogRepositoryImpl';
import { LogService } from './log.service';

@Module({
	controllers: [LogController],
	providers: [
		LogService,
		{
			provide: 'LogRepository',
			useClass: LogRepositoryImpl
		}
	],
	exports: [LogService, 'LogRepository']
})
export class LogModule {}
