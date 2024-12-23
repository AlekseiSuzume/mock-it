import { Component, OnInit } from '@angular/core';
import { IMock } from '../mock.interface';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { MockService } from '../mock.service';

@Component({
  selector: 'app-mock-detail',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [MockService],
  templateUrl: './mock-detail.component.html',
  styleUrl: './mock-detail.component.scss'
})
export class MockDetailComponent implements OnInit{

  mock!: IMock;
  mockSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mockService: MockService,
  ) {
  }

  ngOnInit(): void {
    this.mockSubscription = this.route.paramMap
      .pipe(switchMap((params) => this.mockService.getMockById(params.get('id')!)))
      .subscribe((mock) => {
        this.mock = mock;
      });
    }

}
