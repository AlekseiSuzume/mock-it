import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ILoginResponse, IUser } from './auth.interfaces';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  snackbarConfig: MatSnackBarConfig = {
    duration: 2500
  };

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private isAuthentication = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
  }

  public login(user: IUser): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>('api/users/login', user).pipe(
      tap((res: ILoginResponse) => this.doLoginUser(res)),
      catchError((err) => {
        this.snackbar.open(`Неправильный логин или пароль`, 'Закрыть', this.snackbarConfig);
        return throwError(() => err);
      })
    );
  }

  public logOut() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthentication.next(false);
    this.router.navigate(['./auth/login']);
  }

  public refreshTokens(tokens: ILoginResponse) {
    this.httpClient
      .post<ILoginResponse>('api/users/refresh', tokens)
      .pipe(tap((response: ILoginResponse) => this.doLoginUser(response)))
      .subscribe();
  }

  public isTokenExpired() {
    const jwtHelper = new JwtHelperService();
    const jwtTokens = localStorage.getItem(this.JWT_TOKEN);
    if (jwtTokens) {
      const tokens: ILoginResponse = JSON.parse(jwtTokens);
      return jwtHelper.isTokenExpired(tokens.accessToken);
    }
    return true;
  }

  public isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(loginResponse: ILoginResponse) {
    this.storeJwtToken(loginResponse);
    this.isAuthentication.next(true);
  }

  private storeJwtToken(tokens: ILoginResponse) {
    localStorage.setItem(this.JWT_TOKEN, JSON.stringify(tokens));
  }
}
