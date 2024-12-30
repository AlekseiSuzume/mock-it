import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Page404Component } from '../components/page-404/page-404.component';
import { MainComponent } from './main/main.component';
import { MainLogsComponent } from './main/main-logs/main-logs.component';
import { MainMocksComponent } from './main/main-mocks/main-mocks.component';

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
        component: MainMocksComponent
      },
      {
        path: 'logs',
        component: MainLogsComponent
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
