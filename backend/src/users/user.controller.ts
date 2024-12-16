import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { DtoHelperService } from './dto/dto-helper.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserModel, LoginModel } from './models/user.model';
import { RefreshJwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private dtoHelperService: DtoHelperService
	) {}

	@Post('register')
	@ApiOperation({ summary: 'Create a new user' })
	@ApiOkResponse({ type: CreateUserModel })
	async create(@Req() request, @Body() createUserDto: CreateUserDto) {
		// TODO переписать на параметр из БД
		const secretPassword = request.headers['secret-password'];
		if (secretPassword !== '123') {
			throw new HttpException('Secret password error', HttpStatus.BAD_REQUEST);
		}
		const userEntity: IUser = this.dtoHelperService.createUserDtoToEntity(createUserDto);
		return this.userService.create(userEntity);
	}

	@Post('login')
	@ApiOperation({ summary: 'Logs user' })
	@ApiOkResponse({ type: LoginModel })
	async login(@Body() loginUserDto: LoginUserDto) {
		const userEntity: IUser = this.dtoHelperService.loginUserDtoToEntity(loginUserDto);
		const tokens = await this.userService.login(userEntity);
		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken
		};
	}

	@Post('refresh')
	@UseGuards(RefreshJwtAuthGuard)
	@ApiOperation({ summary: 'Refresh token' })
	@ApiOkResponse({ type: LoginModel })
	async refreshToken(@Body() body: { refreshToken: string }) {
		return this.userService.refreshToken(body.refreshToken);
	}
}
