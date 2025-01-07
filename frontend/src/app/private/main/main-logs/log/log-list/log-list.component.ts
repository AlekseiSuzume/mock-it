import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LogService } from '../log.service';
import { LogModel } from '../log.model';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSmImage,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgForOf,
    NgClass,
    MatCardTitleGroup,
    MatCardSmImage
  ],
  providers: [LogService],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss'
})
export class LogListComponent implements OnInit, OnChanges {

  @Input() logs: LogModel[] = [];
  selectedItem: LogModel | null = null;
  selectedItemIndex: number | null = null;

  @Output() selectItemEventEmitter = new EventEmitter<number>();

  ngOnInit(): void {
    this.selectItem(0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.logs && changes['logs']){
      this.selectItem(0);
    }
  }

  selectItem(index: number) {
    this.selectedItem = this.logs[index];
    this.selectedItemIndex = index;
    this.selectItemEventEmitter.emit(index);
  }

}
