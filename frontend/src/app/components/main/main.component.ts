import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../public/auth/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    HeaderComponent
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
