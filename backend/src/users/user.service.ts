import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { DatabaseService } from '../database/database.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: DatabaseService,
		private authService: AuthService
	) {}

	async create(newUser: IUser) {
		const loginExists = await this.loginExists(newUser.login!);

		if (!loginExists) {
			newUser.password_hash = await this.authService.hashPassword(newUser.password_hash);
			newUser.login = newUser.login!.toLowerCase();

			const user = await this.prisma.user.create({
				data: {
					login: newUser.login,
					username: newUser.username,
					password_hash: newUser.password_hash
				}
			});
			return await this.findOne(user.id);
		} else {
			throw new HttpException('Username already taken', HttpStatus.CONFLICT);
		}
	}

	async login(user: IUser) {
		const foundUser = await this.findByLogin(user.login);
		if (foundUser) {
			const passwordMatching = await this.authService.comparePasswords(
				user.password_hash,
				foundUser.password_hash
			);
			if (passwordMatching) {
				const payload = await this.findOne(foundUser.id);
				const accessToken = await this.authService.generateAccessJwt(payload!);
				const refreshToken = await this.authService.generateRefreshJwt(payload!);
				return {
					accessToken: accessToken,
					refreshToken: refreshToken
				};
			} else {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}
		} else {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
	}

	async refreshToken(refreshToken: string) {
		const decodedUser = (await this.authService.decodedJwt(refreshToken)).user as IUser;
		console.log(await this.authService.verifyJwt(refreshToken));
		console.log(await this.authService.decodedJwt(refreshToken));
		const payload = await this.findByLogin(decodedUser.login);
		if (payload) {
			const accessToken = await this.authService.generateAccessJwt(payload!);
			return {
				accessToken: accessToken
			};
		} else {
			throw new HttpException(
				'Login was not successfully. Wrong Credentials',
				HttpStatus.UNAUTHORIZED
			);
		}
	}

	private async findByLogin(login: string) {
		return this.prisma.user.findUnique({
			where: { login },
			select: {
				id: true,
				password_hash: true,
				username: true,
				login: true
			}
		});
	}

	private async findOne(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				login: true,
				username: true,
				password_hash: false
			}
		});
	}

	private async loginExists(login: string) {
		const user = await this.prisma.user.findUnique({
			where: { login }
		});
		return !!user;
	}
}
