import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockModule } from './mock/mock.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MockService } from './mock/mock.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'backend/.env'
		}),
		MockModule,
		DatabaseModule
	],
	controllers: [AppController],
	providers: [AppService, MockService]
})
export class AppModule {}
