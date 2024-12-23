import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { IMock } from '../mock.interface';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MockEditComponent } from '../mock-edit/mock-edit.component';
import { MockService } from '../mock.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mock-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    MatCardModule,
    NgForOf,
    NgIf,
    MockEditComponent,
    NgClass
  ],
  providers: [MockService, DataService],
  templateUrl: './mock-list.component.html',
  styleUrl: './mock-list.component.scss'
})
export class MockListComponent implements OnInit {

  mocks!: IMock[];
  newMock: IMock | null = null;
  selectedItem: IMock | null = null;
  selectedItemIndex: number | null = null;

  constructor(
    private dataService: DataService
  ) {
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
        endpoint: `/test/${this.mocks[0].id! + 1}`,
        method: 'GET',
        name: `Example mock name ${this.mocks[0].id! + 1}`,
        status_code: 200
      };
      this.mocks.unshift(this.newMock);
      this.selectItem(0);
    }
  }

}
