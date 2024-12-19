import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const jwtToken = getJwtToken();
	if (jwtToken) {
		const clonedRequest = req.clone({
			setHeaders: {
				Authorization: `Bearer ${jwtToken}`
			}
		});
		return next(clonedRequest);
	}
	return next(req);
};

function getJwtToken() {
	const tokens = localStorage.getItem('JWT_TOKEN');
	if (tokens) {
		return JSON.parse(tokens).accessToken;
	}
	return null;
}
