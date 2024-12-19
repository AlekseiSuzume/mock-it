import { Routes } from '@angular/router';
import { Page404Component } from './components/page-404/page-404.component';
import { authGuard } from './public/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./public/auth/auth-routing.module').then((m) => m.AuthRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./private/private-routing.module').then((m) => m.PrivateRoutingModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: Page404Component
  }
];
