import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Methods } from '../../private/mock/mock.interface';

@Component({
  selector: 'app-dropdown-method',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './dropdown-method.component.html',
  styleUrl: './dropdown-method.component.scss'
})
export class DropdownMethodComponent implements OnInit {
  methods = Object.values(Methods);

  @Input() selectedMethod: string = Methods.GET;
  @Output() methodSelected = new EventEmitter<string>();

  onSelect(method: string): void {
    this.selectedMethod = method;
    this.methodSelected.emit(this.selectedMethod);
  }

  ngOnInit(): void {
    this.selectedMethod = Methods.GET;
  }
}
