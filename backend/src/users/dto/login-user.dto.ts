import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
	@IsNotEmpty()
	@ApiProperty()
	login: string;
	@IsNotEmpty()
	@ApiProperty()
	password: string;
}
