import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LogModel } from '../log.model';
import { NgForOf, NgIf } from '@angular/common';
import { parseHeaders } from '../../../../../../utils/parsers';

@Component({
  selector: 'app-log-detail',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './log-detail.component.html',
  styleUrl: './log-detail.component.scss'
})
export class LogDetailComponent implements OnChanges {
  @Input() selectedItem: LogModel | null = null;
  requestHeaders: { key: string, value: string }[] = [];
  responseHeaders: { key: string, value: string }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedItem && changes['selectedItem']) {
      this.requestHeaders = parseHeaders(this.selectedItem.request_info.request_headers);
      this.responseHeaders = parseHeaders(this.selectedItem.response_info.response_headers);
    }
  }

}
