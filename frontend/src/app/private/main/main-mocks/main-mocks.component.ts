import { Component, OnInit } from '@angular/core';
import { MockEditComponent } from './mock/mock-edit/mock-edit.component';
import { MockListComponent } from './mock/mock-list/mock-list.component';
import { MatButton } from '@angular/material/button';
import { MockService } from './mock/mock.service';
import { DataService } from './mock/data.service';
import { MockModel } from './mock/mock.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mocks',
  standalone: true,
  imports: [
    MockEditComponent,
    MockListComponent,
    MatButton,
    FormsModule,
  ],
  providers: [MockService, DataService],
  templateUrl: './main-mocks.component.html',
  styleUrl: './main-mocks.component.scss'
})
export class MainMocksComponent implements OnInit{

  mocks: MockModel[] = [];
  newMock: MockModel | null = null;
  selectedItem: MockModel | null = null;
  selectedItemIndex: number | null = null;

  searchText: string = '';
  filteredMocks: MockModel[] = [];


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.fetchItems();
    this.dataService.currentItems$.subscribe(items => {
      this.mocks = items;
      this.filteredMocks = items;
      if (this.mocks.length > 0) {
        if (this.selectedItemIndex) {
          this.selectItem(this.selectedItemIndex);
        } else {
          this.selectItem(0);
        }
      }
    });
  }

  fetchItems() {
    this.dataService.fetchItems();
  }

  handleItemSaved(item: MockModel) {
    this.dataService.saveItem(item).subscribe(() => {
      this.fetchItems();
      this.newMock = null;
    });
  }

  handleItemDeleted(itemId: number) {
    this.dataService.deleteItem(itemId).subscribe(() => {
      this.fetchItems();
    });
  }

  selectItem(index: number) {
    this.selectedItem = this.filteredMocks[index];
    this.selectedItemIndex = index;
  }

  filterItems() {
    if (!this.searchText) {
      this.filteredMocks = this.mocks;
      this.selectItem(0)
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredMocks = this.mocks.filter(item =>
      item.name.toLowerCase().includes(searchTextLower) ||
      item.url.toLowerCase().includes(searchTextLower) ||
      item.method.toLowerCase().includes(searchTextLower)
    );
    this.selectItem(0)
  }

  createNewMock() {
    this.dataService.currentItems$.subscribe(items => {
      this.mocks = items;
    });
    if (!this.newMock) {
      this.newMock = {
        body: 'Example mock body',
        url: `/test/${this.mocks[0].id ? this.mocks[0].id + 1 : 1}`,
        method: 'GET',
        name: `Example mock name ${this.mocks[0].id ? this.mocks[0].id + 1 : 1}`,
        status_code: 200
      };
      this.mocks.unshift(this.newMock);
      this.selectItem(0);
    }
  }

}
