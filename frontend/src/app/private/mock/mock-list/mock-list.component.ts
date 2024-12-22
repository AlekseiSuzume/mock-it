import { Component, OnInit } from '@angular/core';
import { MockListService } from './mock-list.service';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { IMock } from '../mock.interface';
import { MatGridList } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { MockEditComponent } from '../mock-edit/mock-edit.component';

@Component({
  selector: 'app-mock-list',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatButton,
    MatGridList,
    MatCardModule,
    NgForOf,
    NgIf,
    MockEditComponent
  ],
  providers: [MockListService],
  templateUrl: './mock-list.component.html',
  styleUrl: './mock-list.component.scss'
})
export class MockListComponent implements OnInit {

  mocks!: IMock[];
  selectedItemId: number | null = null;

  constructor(
    private mockService: MockListService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.mockService.getAllMocks().subscribe(value => this.mocks = value.reverse());
  }

  selectItem(id: number) {
    this.selectedItemId = id; // Устанавливаем id выбранного элемента
  }

  public editItem(mock: IMock) {
    this.router.navigate([`/mock/${mock.id}/edit`]);
  }

  public deleteItem(id: number) {
    this.mockService.deleteMock(id).subscribe(() => this.mocks = this.mocks.filter(item => item.id !== id));
  }
}
