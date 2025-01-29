import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { IUser } from '../../user.interface';

@Injectable()
export class DtoHelperService {
	createUserDtoToEntity(createUserDto: CreateUserDto): IUser {
		return {
			username: createUserDto.username,
			login: createUserDto.login,
			password_hash: createUserDto.password
		};
	}

	loginUserDtoToEntity(loginUserDto: LoginUserDto): IUser {
		return {
			login: loginUserDto.login,
			password_hash: loginUserDto.password
		};
	}
}
