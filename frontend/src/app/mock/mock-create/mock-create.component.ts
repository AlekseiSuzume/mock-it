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
    name: ['',[Validators.required]],
    url: ['',[Validators.required]],
    body: ['',[Validators.required]],
    status_code: ['',[Validators.required]]
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

  get url(): FormControl {
    return this.addForm.get('url') as FormControl;
  }

  get body(): FormControl {
    return this.addForm.get('body') as FormControl;
  }

  get status_code(): FormControl {
    return this.addForm.get('status_code') as FormControl;
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.mockService.addMock({
        name: this.name.value,
        url: this.url.value,
        body: this.body.value,
        status_code: this.status_code.value
      }).subscribe(() => this.router.navigate(['../mocks']));
    }
  }

}
