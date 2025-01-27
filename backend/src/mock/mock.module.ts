import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { MockRepositoryImpl } from './MockRepositoryImpl';

@Module({
	controllers: [MockController],
	providers: [
		MockService,
		{
			provide: 'MockRepository',
			useClass: MockRepositoryImpl
		}
	],
	exports: ['MockRepository']
})
export class MockModule {}
