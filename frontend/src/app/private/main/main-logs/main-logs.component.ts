import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LogListComponent } from './log/log-list/log-list.component';
import { LogDetailComponent } from './log/log-detail/log-detail.component';
import { LogModel } from './log/log.model';
import { LogService } from './log/log.service';

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
export class MainLogsComponent implements OnInit {

  constructor(private logService: LogService) {
  }

  logs: LogModel[] = [];
  selectedItem: LogModel | null = null;
  selectedItemIndex: number | null = null;

  ngOnInit(): void {
    this.fetchItems();
    this.logService.currentItems$.subscribe(items => {
      this.logs = items;
      if (this.logs.length > 0) {
        if (this.selectedItemIndex) {
          this.selectItem(this.selectedItemIndex);
        } else {
          this.selectItem(0);
        }
      }
    });
  }

  fetchItems() {
    this.logService.fetchItems();
  }

  selectItem(index: number) {
    this.selectedItem = this.logs[index];
    this.selectedItemIndex = index;
  }

    clear() {
    //TODO реализовать вызов метода удаления логов
  }

}
