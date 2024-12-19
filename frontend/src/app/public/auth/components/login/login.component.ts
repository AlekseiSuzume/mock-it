import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButton,
    MatInput,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private loginSubscription?: Subscription;

  public fbForm = this._fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  get login(): FormControl {
    return this.fbForm.get('login') as FormControl;
  }

  get password(): FormControl {
    return this.fbForm.get('password') as FormControl;
  }

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  public submit() {
    if (this.fbForm.valid) {
      this.authService
        .login({
          login: this.login.value,
          password: this.password.value
        })
        .subscribe(() => this.router.navigate(['../']));
    }
  }

  private ngOnDestroy() {
    if (this.loginSubscription) this.loginSubscription.unsubscribe();
  }
}
