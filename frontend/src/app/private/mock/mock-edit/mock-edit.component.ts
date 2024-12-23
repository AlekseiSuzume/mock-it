import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { IMock } from '../mock.interface';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { JsonPipe, NgIf } from '@angular/common';
import { MockService } from '../mock.service';
import { DropdownMethodComponent } from '../../../components/dropdown/dropdown-method.component';
import { BodyInputComponent } from '../../../components/body-input/body-input.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mock-edit',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    JsonPipe,
    NgIf,
    DropdownMethodComponent,
    BodyInputComponent
  ],
  providers: [MockService, DataService],
  templateUrl: './mock-edit.component.html',
  styleUrl: './mock-edit.component.scss'
})
export class MockEditComponent implements OnChanges, OnDestroy {

  @Input() selectedItemIndex!: number | null;
  @Input() selectedItem: IMock | null = null;
  @Output() itemSaved = new EventEmitter<any>();
  @Output() itemDeleted = new EventEmitter<number>();
  mockSubscription!: Subscription;
  selectedMethod?: string;
  bodyInput: string = '';

  public fbForm = this._fb.group({
    name: [this.selectedItem?.name ?? '', [Validators.required]],
    endpoint: [this.selectedItem?.endpoint ?? '', [Validators.required]],
    status_code: [this.selectedItem?.status_code.toString() ?? '', [Validators.required]]
  });

  constructor(
    private _fb: FormBuilder,
  ) {
  }

  get name(): FormControl {
    return this.fbForm.get('name') as FormControl;
  }

  get endpoint(): FormControl {
    return this.fbForm.get('endpoint') as FormControl;
  }

  get status_code(): FormControl {
    return this.fbForm.get('status_code') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItem'] && this.selectedItem !== null) {
      this.selectedMethod = this.selectedItem.method;
      this.bodyInput = this.selectedItem.body;
      this.fbForm.patchValue({
        name: this.selectedItem.name,
        endpoint: this.selectedItem.endpoint,
        status_code: this.selectedItem.status_code.toString()
      });
    }
  }

  saveItem() {
    if (this.fbForm.valid) {
      const reqBody = {
        id: this.selectedItem!.id,
        body_patterns: this.selectedItem!.body_patterns,
        headers: '',
        method: this.selectedMethod!,
        name: this.name.value,
        endpoint: this.endpoint.value,
        body: this.bodyInput ?? '',
        status_code: Number.parseInt(this.status_code.value)
      };
        this.itemSaved.emit(reqBody);
    }
  }

  deleteItem() {
    this.itemDeleted.emit(this.selectedItem!.id);
  }

  onBodyInputChange(value: string): void {
    this.bodyInput = value;
  }

  ngOnDestroy() {
    if (this.mockSubscription) this.mockSubscription.unsubscribe();
  }

  onMethodSelected(method: string): void {
    this.selectedMethod = method;
  }

}
