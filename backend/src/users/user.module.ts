import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { DtoHelperService } from './models/dto/dto-helper.service';

@Module({
	imports: [AuthModule],
	controllers: [UserController],
	providers: [UserService, DtoHelperService]
})
export class UserModule {}
