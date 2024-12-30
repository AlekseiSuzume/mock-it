import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogService } from '../log.service';
import { ILog } from '../ILog';
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
export class LogListComponent implements OnInit {

  @Input() logs: ILog[] = [];
  selectedItem: ILog | null = null;
  selectedItemIndex: number | null = null;

  @Output() selectItemEventEmitter = new EventEmitter<number>();

  constructor(private logService: LogService) {
  }

  ngOnInit(): void {
    this.logService.currentItems$.subscribe((data) => {
      this.logs = data;
    });
    this.selectItem(0);
  }

  selectItem(index: number) {
    this.selectedItem = this.logs[index];
    this.selectedItemIndex = index;
    this.selectItemEventEmitter.emit(index);
  }

}
