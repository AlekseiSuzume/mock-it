export interface IUser {
  login: string;
	password: string;
}

export interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
}
