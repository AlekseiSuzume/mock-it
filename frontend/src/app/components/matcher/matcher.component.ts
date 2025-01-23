import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatcherType } from '../../private/main/main-mocks/mock/mock.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-matcher',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './matcher.component.html',
  styleUrl: './matcher.component.scss'
})
export class MatcherComponent implements OnInit, OnChanges {
  protected readonly matcherTypesValues = Object.values(MatcherType);
  protected readonly MatcherTypes = MatcherType;

  @Input() selectedMatcherTypeInput: string = MatcherType.NONE;
  @Output() selectedMatcherTypeOutput: EventEmitter<string> = new EventEmitter<string>();

  @Input() matcherPatternInput?: string;
  @Output() matcherPatternInputChange: EventEmitter<string> = new EventEmitter<string>();

  partBeforeComma: string = '';
  partAfterComma: string = '';

  ngOnInit(): void {
    this.selectedMatcherTypeInput = MatcherType.NONE;
    this.updateParts();
  }

  ngOnChanges(): void {
    this.updateParts();
  }

  updateParts() {
    if (this.matcherPatternInput) {
      const parts = this.matcherPatternInput.split(',');
      this.partBeforeComma = parts[0] || '';
      this.partAfterComma = parts[1] || '';
    } else {
      this.partBeforeComma = '';
      this.partAfterComma = '';
    }
  }

  onPartBeforeChange(value: string) {
    this.partBeforeComma = value;
    this.emitCombinedPattern();
  }

  onPartAfterChange(value: string) {
    this.partAfterComma = value;
    this.emitCombinedPattern();
  }

  emitCombinedPattern() {
    this.matcherPatternInput = `${this.partBeforeComma},${this.partAfterComma}`;
    this.matcherPatternInputChange.emit(this.matcherPatternInput);
  }

  onSelect(matcherType: string): void {
    this.selectedMatcherTypeInput = matcherType;
    this.selectedMatcherTypeOutput.emit(this.selectedMatcherTypeInput);
  }
}
