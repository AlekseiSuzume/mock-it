import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
  providers: [MockService],
  templateUrl: './mock-edit.component.html',
  styleUrl: './mock-edit.component.scss'
})
export class MockEditComponent implements OnChanges, OnDestroy {

  @Input() selectedItemId!: number | null;
  mock?: IMock;
  mockSubscription!: Subscription;
  selectedMethod?: string;
  bodyInput: string = '';

  public fbForm = this._fb.group({
    name: [this.mock?.name ?? '', [Validators.required]],
    endpoint: [this.mock?.endpoint ?? '', [Validators.required]],
    status_code: [this.mock?.status_code.toString() ?? '', [Validators.required]]
  });

  constructor(
    private mockService: MockService,
    private _fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItemId'] && this.selectedItemId !== null) {
      this.mockSubscription = this.mockService.getMockById(this.selectedItemId.toString())
        .subscribe((mock) => {
            this.mock = mock;
            this.selectedMethod = mock.method;
            this.bodyInput = mock.body;
            this.fbForm.patchValue({
              name: this.mock.name,
              endpoint: this.mock.endpoint,
              status_code: this.mock.status_code.toString()
            });
          }
        );
    }
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

  ngOnDestroy() {
    if (this.mockSubscription) this.mockSubscription.unsubscribe();
  }

  onMethodSelected(method: string): void {
    this.selectedMethod = method;
  }

  save2(): void {
    console.log(1);
    if (this.fbForm.valid) {
      this.mockService.editMock({
        id: this.mock?.id,
        body_patterns: this.mock?.body_patterns,
        headers: '',
        method: this.selectedMethod!,
        name: this.name.value,
        endpoint: this.endpoint.value,
        body: this.bodyInput ?? '',
        status_code: Number.parseInt(this.status_code.value)
      }).subscribe(() => this.router.navigate(['../mocks']));
    }
  }

  onBodyInputChange(value: string): void {
    this.bodyInput = value;
  }

}
