import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserModel } from '../users/models/user.model';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async generateAccessJwt(user: CreateUserModel): Promise<any> {
		return this.jwtService.signAsync({ user });
	}

	async generateRefreshJwt(user: CreateUserModel): Promise<any> {
		return this.jwtService.signAsync({ user }, { expiresIn: '2d' });
	}

	async decodedJwt(token: string) {
		return this.jwtService.decode(token);
	}

	async hashPassword(password: string): Promise<any> {
		return bcrypt.hash(password, 12);
	}

	async comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
		return bcrypt.compare(password, storedPasswordHash);
	}

	async verifyJwt(jwt: string): Promise<any> {
		return this.jwtService.verifyAsync(jwt);
	}
}
