import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Methods } from '../../private/mock/mock.interface';

@Component({
  selector: 'app-dropdown-method',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './dropdown-method.component.html',
  styleUrl: './dropdown-method.component.scss'
})
export class DropdownMethodComponent implements OnInit {
  methods = Object.values(Methods);

  @Input() selectedMethodInput: string = Methods.GET;
  @Output() selectedMethodOutput = new EventEmitter<string>();

  onSelect(method: string): void {
    this.selectedMethodInput = method;
    this.selectedMethodOutput.emit(this.selectedMethodInput);
  }

  ngOnInit(): void {
    this.selectedMethodInput = Methods.GET;
  }
}
