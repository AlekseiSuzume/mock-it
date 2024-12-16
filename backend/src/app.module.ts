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
	controllers: [AppController],
	providers: [AppService, MockService, UserService]
})
export class AppModule {}
