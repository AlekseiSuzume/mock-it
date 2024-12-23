import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Page404Component } from '../components/page-404/page-404.component';
import { MockDetailComponent } from './mock/mock-detail/mock-detail.component';
import { MockListComponent } from './mock/mock-list/mock-list.component';
import { MockEditComponent } from './mock/mock-edit/mock-edit.component';
import { MainComponent } from '../components/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'mocks',
        pathMatch: 'full'
      },
      {
        path: 'mocks',
        component: MockListComponent
      },
      {
        path: 'mock/:id',
        component: MockDetailComponent
      },
      {
        path: 'mock/:id/edit',
        component: MockEditComponent
      },
      {
        path: '**',
        component: Page404Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PrivateRoutingModule {
}
