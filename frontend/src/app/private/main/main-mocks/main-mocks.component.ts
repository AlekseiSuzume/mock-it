import { Component, OnInit } from '@angular/core';
import { MockEditComponent } from '../../mock/mock-edit/mock-edit.component';
import { MockListComponent } from '../../mock/mock-list/mock-list.component';
import { MatButton } from '@angular/material/button';
import { MockService } from '../../mock/mock.service';
import { DataService } from '../../mock/data.service';
import { IMock } from '../../mock/mock.interface';

@Component({
  selector: 'app-mocks',
  standalone: true,
  imports: [
    MockEditComponent,
    MockListComponent,
    MatButton
  ],
  providers: [MockService, DataService],
  templateUrl: './main-mocks.component.html',
  styleUrl: './main-mocks.component.scss'
})
export class MainMocksComponent implements OnInit{

  mocks: IMock[] = [];
  newMock: IMock | null = null;
  selectedItem: IMock | null = null;
  selectedItemIndex: number | null = null;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.fetchItems();
    this.dataService.currentItems$.subscribe(items => {
      this.mocks = items;
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

  handleItemSaved(item: IMock) {
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
    this.selectedItem = this.mocks[index];
    this.selectedItemIndex = index;
  }

  createNewMock() {
    this.dataService.currentItems$.subscribe(items => {
      this.mocks = items;
    });
    if (!this.newMock) {
      this.newMock = {
        body: 'Example mock body',
        url: `/test/${this.mocks[0].id! + 1}`,
        method: 'GET',
        name: `Example mock name ${this.mocks[0].id! + 1}`,
        status_code: 200
      };
      this.mocks.unshift(this.newMock);
      this.selectItem(0);
    }
  }

}
