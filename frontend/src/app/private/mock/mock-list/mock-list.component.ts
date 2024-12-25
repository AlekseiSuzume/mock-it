import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() mocks: IMock[] = [];
  selectedItem: IMock | null = null;
  selectedItemIndex: number | null = null;

  @Output() selectItemEventEmitter = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
        this.selectItem(0);
    }

  selectItem(index: number) {
    this.selectedItem = this.mocks[index];
    this.selectedItemIndex = index;
    this.selectItemEventEmitter.emit(index);
  }

}
