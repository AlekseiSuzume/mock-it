import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LogListComponent } from '../../log/log-list/log-list.component';
import { LogDetailComponent } from '../../log/log-detail/log-detail.component';

@Component({
  selector: 'app-main-logs',
  standalone: true,
  imports: [
    MatButton,
    LogListComponent,
    LogDetailComponent
  ],
  templateUrl: './main-logs.component.html',
  styleUrl: './main-logs.component.scss'
})
export class MainLogsComponent {

  clear() {

  }

}
