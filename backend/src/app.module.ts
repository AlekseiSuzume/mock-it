import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockModule } from './mock/mock.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MockService } from './mock/mock.service';
import { UserService } from './users/user.service';
import { UserModule } from './users/user.module';
import { LogService } from './log/log.service';
import { LogController } from './log/log.controller';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'backend/.env'
		}),
		MockModule,
		DatabaseModule,
		AuthModule,
		UserModule
	],
	controllers: [AppController, LogController],
	providers: [AppService, MockService, UserService, LogService]
})
export class AppModule {}
