import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { MockModel } from '../mock.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MockService } from '../mock.service';
import { DataService } from '../data.service';
import { DropdownMethodComponent } from '../../../../../components/dropdown/dropdown-method.component';
import { BodyInputComponent } from '../../../../../components/body-input/body-input.component';
import { ResponseHeadersComponent } from '../../../../../components/response-headers/response-headers.component';
import { parseHeaders } from '../../../../../../utils/parsers';
import { convertHeadersToJson } from '../../../../../../utils/converters';
import { MatcherComponent } from '../../../../../components/matcher/matcher.component';

@Component({
  selector: 'app-mock-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    DropdownMethodComponent,
    BodyInputComponent,
    ResponseHeadersComponent,
    MatcherComponent
  ],
  providers: [MockService, DataService],
  templateUrl: './mock-edit.component.html',
  styleUrl: './mock-edit.component.scss'
})
export class MockEditComponent implements OnChanges, OnDestroy {

  @Input() selectedItem: MockModel | null = null;
  @Output() itemSavedEventEmitter = new EventEmitter<any>();
  @Output() itemDeletedEventEmitter = new EventEmitter<number>();

  mockSubscription!: Subscription;
  selectedMethod?: string;
  selectedMatcherType?: string;
  bodyInput: string = '';
  matcherPattern?: string;
  headers: { key: string, value: string }[] = [];

  public fbForm = this._fb.group({
    name: [this.selectedItem?.name ?? '', [Validators.required]],
    endpoint: [this.selectedItem?.url ?? '', [Validators.required]],
    status_code: [this.selectedItem?.status_code.toString() ?? '', [Validators.required]]
  });

  constructor(
    private _fb: FormBuilder
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
    if (this.selectedItem && changes['selectedItem']) {
      this.selectedMethod = this.selectedItem.method ?? 'GET';
      this.selectedMatcherType = this.selectedItem.matcher_type ?? 'NONE';
      this.matcherPattern = this.selectedItem.body_patterns;
      this.bodyInput = this.selectedItem.body;
      this.headers = parseHeaders(this.selectedItem.headers ?? '');
      this.fbForm.patchValue({
        name: this.selectedItem.name,
        endpoint: this.selectedItem.url,
        status_code: this.selectedItem.status_code.toString()
      });
    }
  }

  ngOnDestroy() {
    if (this.mockSubscription) this.mockSubscription.unsubscribe();
  }

  saveItem() {
    if (this.fbForm.valid) {
      const reqBody: MockModel = {
        id: this.selectedItem?.id,
        body_patterns: this.selectedMatcherType !== 'NONE' ? this.matcherPattern : '',
        headers: convertHeadersToJson(this.headers),
        method: this.selectedMethod!,
        matcher_type: this.selectedMatcherType!,
        name: this.name.value,
        url: this.endpoint.value,
        body: this.bodyInput ?? '',
        status_code: Number.parseInt(this.status_code.value)
      };
      this.itemSavedEventEmitter.emit(reqBody);
    }
  }

  deleteItem() {
    this.itemDeletedEventEmitter.emit(this.selectedItem!.id);
  }

  onBodyInputChange(value: string): void {
    this.bodyInput = value;
  }

  onHeadersChange(newHeaders: { key: string, value: string }[]) {
    this.headers = newHeaders;
  }

  onMethodSelected(method: string): void {
    this.selectedMethod = method;
  }

  onMatcherTypeSelected(matcherType: string): void {
    this.selectedMatcherType = matcherType;
  }

  onMatcherPatternInputChange(value: string) {
    this.matcherPattern = value;
  }
}
