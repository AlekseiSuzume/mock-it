import { Component } from '@angular/core';
import { AuthService } from '../../public/auth/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private authService: AuthService) {
  }

  public logOut() {
    this.authService.logOut();
  }
}
