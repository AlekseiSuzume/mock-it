import { Routes } from '@angular/router';
import { MockListComponent } from './mock/mock-list/mock-list.component';
import { Page404Component } from './page-404/page-404.component';
import { MockEditComponent } from './mock/mock-edit/mock-edit.component';
import { MockDetailComponent } from './mock/mock-detail/mock-detail.component';
import { MockCreateComponent } from './mock/mock-create/mock-create.component';

export const routes: Routes = [
  {
    path: 'mock/:id',
    component: MockDetailComponent
  },
  {
    path: 'mocks/create',
    component: MockCreateComponent
  },
  {
    path: 'mocks',
    component: MockListComponent
  },
  {
    path: 'mock/:id/edit',
    component: MockEditComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];
