import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MockModel } from '../mock.model';
import { MockService } from '../mock.service';
import { DataService } from '../data.service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-mock-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    NgClass,
    NgIf,
    NgForOf
  ],
  providers: [MockService, DataService],
  templateUrl: './mock-list.component.html',
  styleUrl: './mock-list.component.scss'
})
export class MockListComponent implements OnInit, OnChanges {

  @Input() mocks: MockModel[] = [];
  selectedItem: MockModel | null = null;
  selectedItemIndex: number | null = null;

  @Output() selectItemEventEmitter = new EventEmitter<number>();

  ngOnInit(): void {
    this.selectItem(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mocks && changes['mocks']){
      this.selectItem(0);
    }
  }

  selectItem(index: number) {
    this.selectedItem = this.mocks[index];
    this.selectedItemIndex = index;
    this.selectItemEventEmitter.emit(index);
  }

}
