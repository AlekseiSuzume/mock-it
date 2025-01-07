import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
};

export const unAuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse &&
        !(req.url.includes('auth/login') || req.url.includes('auth/refresh')) &&
        error.status === 401) {
        const jwtTokens = getJwtToken();
        if (jwtTokens && jwtTokens.refreshToken) {
          authService.refreshTokens(jwtTokens);
        } else {
          authService.logOut();
        }
      }
      return throwError(() => error);
    })
  );
};

function getJwtToken() {
  const tokens = localStorage.getItem('JWT_TOKEN');
  if (tokens) {
    return JSON.parse(tokens);
  }
  return null;
}

function getAccessToken() {
  const tokens = localStorage.getItem('JWT_TOKEN');
  if (tokens) {
    return JSON.parse(tokens).accessToken;
  }
  return null;
}

