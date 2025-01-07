import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LogListComponent } from './log/log-list/log-list.component';
import { LogDetailComponent } from './log/log-detail/log-detail.component';
import { LogModel } from './log/log.model';
import { LogService } from './log/log.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-logs',
  standalone: true,
  imports: [
    MatButton,
    LogListComponent,
    LogDetailComponent,
    ReactiveFormsModule,
    FormsModule,
    NgIf
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

  searchText: string = '';
  filteredLogs: LogModel[] = [];

  ngOnInit(): void {
    this.fetchItems();
    this.logService.currentItems$.subscribe(items => {
      this.logs = items;
      this.filteredLogs = items;
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
    this.selectedItem = this.filteredLogs[index];
    this.selectedItemIndex = index;
  }

  filterItems() {
    if (!this.searchText) {
      this.filteredLogs = this.logs;
      this.selectItem(0)
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredLogs = this.logs.filter(item =>
      item.request_info.request_time.toLowerCase().includes(searchTextLower) ||
      item.request_info.method.toLowerCase().includes(searchTextLower) ||
      item.request_info.request_url.toLowerCase().includes(searchTextLower)
    );
    this.selectItem(0);
  }

    clear() {
    this.logService.delete();
    this.fetchItems();
  }

}
