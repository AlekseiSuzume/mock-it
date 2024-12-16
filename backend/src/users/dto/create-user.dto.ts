import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@ApiProperty()
	username: string;
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@ApiProperty()
	login: string;
	@IsNotEmpty()
	@MinLength(8)
	@ApiProperty()
	password: string;
}
