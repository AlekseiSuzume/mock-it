import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-body-input',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    NgStyle
  ],
  templateUrl: './body-input.component.html',
  styleUrl: './body-input.component.scss'
})
export class BodyInputComponent {
  validationMessage: string = '';
  isValid: boolean = true;
  @Output() bodyInputChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() bodyInput: string = '';

  clearInput(): void {
    this.bodyInput = '';
    this.validationMessage = '';
    this.bodyInputChange.emit(this.bodyInput);
  }

  updateBodyInput(value: string): void {
    this.bodyInput = value;
    this.bodyInputChange.emit(this.bodyInput);
  }

  validateJSON(): void {
    try {
      JSON.parse(this.bodyInput);
      this.validationMessage = 'Valid JSON';
      this.isValid = true;
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.validationMessage = 'Invalid JSON: ' + errorMessage;
      this.isValid = false;
    }
  }
}
