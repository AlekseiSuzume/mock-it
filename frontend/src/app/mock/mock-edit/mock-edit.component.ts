import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMock } from '../mock.interface';
import { Subscription, switchMap } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { MockService } from '../mock.service';

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
    JsonPipe
  ],
  providers: [MockService],
  templateUrl: './mock-edit.component.html',
  styleUrl: './mock-edit.component.scss'
})
export class MockEditComponent implements OnInit {

  mock!: IMock;
  mockSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mockService: MockService,
    private _fb: FormBuilder,
    private router: Router
  ) {
  }

  public fbForm = this._fb.group({
    name: ['',[Validators.required]],
    url: ['',[Validators.required]],
    body: ['',[Validators.required]],
    status_code: ['',[Validators.required]]
  });

  ngOnInit(): void {
    this.mockSubscription = this.route.paramMap
      .pipe(switchMap((params) => this.mockService.getMockById(params.get('id')!)))
      .subscribe((mock) => {
          this.mock = mock;
          this.fbForm.patchValue({
            name: this.mock.name,
            url: this.mock.url,
            body: this.mock.body,
            status_code: this.mock.status_code
          });
        }
      );
  }


  get name(): FormControl {
    return this.fbForm.get('name') as FormControl;
  }

  get url(): FormControl {
    return this.fbForm.get('url') as FormControl;
  }

  get body(): FormControl {
    return this.fbForm.get('body') as FormControl;
  }

  get status_code(): FormControl {
    return this.fbForm.get('status_code') as FormControl;
  }

  private ngOnDestroy() {
    if (this.mockSubscription) this.mockSubscription.unsubscribe();
  }

  edit(): void {
    this.mockService.editMock({
      id: this.mock.id,
      name: this.name.value,
      url: this.url.value,
      body: this.body.value,
      status_code: this.status_code.value
    }).subscribe(() => this.router.navigate(['../mocks']));
  }
}
