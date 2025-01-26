import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockModule } from './mock/mock.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { LogModule } from './log/log.module';
import { MockService } from './mock/mock.service';
import { UserService } from './users/user.service';
import { LogService } from './log/log.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'backend/.env'
		}),
		MockModule,
		DatabaseModule,
		AuthModule,
		UserModule,
		LogModule
	],
	controllers: [AppController],
	providers: [AppService, MockService, UserService, LogService]
})
export class AppModule {}
