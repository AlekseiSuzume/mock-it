import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [],
  templateUrl: './page-404.component.html',
  styleUrl: './page-404.component.scss'
})
export class Page404Component {
  constructor(private router: Router) {
  }

  returnToMainPage() {
    this.router.navigate(['/mocks']);
  }
}
