import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-response-headers',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './response-headers.component.html',
  styleUrl: './response-headers.component.scss'
})
export class ResponseHeadersComponent implements OnChanges {

  @Input() headers: { key: string, value: string }[] = [];
  @Output() headersChange = new EventEmitter<{ key: string, value: string }[]>();

  ngOnChanges() {
    this.emitHeaders();
  }

  addHeader() {
    this.headers.push({ key: '', value: '' });
    this.emitHeaders();
  }

  removeHeader(index: number) {
    this.headers.splice(index, 1);
    this.emitHeaders();
  }

  private emitHeaders() {
    this.headersChange.emit(this.headers);
  }
}
