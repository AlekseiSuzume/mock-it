import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockService } from '../mock.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-mock-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton
  ],
  providers: [MockService],
  templateUrl: './mock-create.component.html',
  styleUrl: './mock-create.component.scss'
})
export class MockCreateComponent {
  public addForm = this._fb.group({
    name: ['', [Validators.required]],
    endpoint: ['', [Validators.required]],
    status_code: ['', [Validators.required]],
    method: ['', [Validators.required]],
    body: ['', [Validators.required]]
  });

  constructor(
    private mockService: MockService,
    private _fb: FormBuilder,
    private router: Router
  ) {
  }

  get name(): FormControl {
    return this.addForm.get('name') as FormControl;
  }

  get endpoint(): FormControl {
    return this.addForm.get('endpoint') as FormControl;
  }

  get status_code(): FormControl {
    return this.addForm.get('status_code') as FormControl;
  }

  get method(): FormControl {
    return this.addForm.get('method') as FormControl;
  }

  get body(): FormControl {
    return this.addForm.get('body') as FormControl;
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.mockService.addMock({
        body_patterns: '',
        headers: '',
        method: this.method.value,
        name: this.name.value,
        endpoint: this.endpoint.value,
        body: this.body.value,
        status_code: Number.parseInt(this.status_code.value)
      }).subscribe(() => this.router.navigate(['../mocks']));
    }
  }
}
