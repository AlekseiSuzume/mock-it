import { ApiProperty } from '@nestjs/swagger';

export class CreateUserModel {
	@ApiProperty()
	id: number;
	@ApiProperty()
	username: string;
	@ApiProperty()
	login: string;
}

export class LoginModel {
	@ApiProperty()
	accessToken: string;
	@ApiProperty()
	refreshToken: string;
}
