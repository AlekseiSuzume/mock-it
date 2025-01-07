import { Component, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { parseJwt } from '../../../utils/parsers';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgOptimizedImage,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isHovered = false;
  userName?: string;

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('JWT_TOKEN');
    if (jwtToken) {
      const accessToken = JSON.parse(jwtToken).accessToken;
      const user = parseJwt(accessToken).user;
      this.userName = user.username ?? 'Гость';
    }
  }
}
