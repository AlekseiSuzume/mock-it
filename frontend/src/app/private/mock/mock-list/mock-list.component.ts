import { Component, OnInit } from '@angular/core';
import { MockListService } from './mock-list.service';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { IMock } from '../mock.interface';

@Component({
  selector: 'app-mock-list',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatButton
  ],
  providers: [MockListService],
  templateUrl: './mock-list.component.html',
  styleUrl: './mock-list.component.scss'
})
export class MockListComponent implements OnInit {

  mocks!: IMock[];
  displayedColumns: string[] = ['id', 'name', 'url', 'body', 'status code', 'actions'];

  constructor(
    private mockService: MockListService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.mockService.getAllMocks().subscribe(value => this.mocks = value);
  }

  public editItem(mock: IMock) {
    this.router.navigate([`/mock/${mock.id}/edit`]);
  }

  public deleteItem(id: number) {
    this.mockService.deleteMock(id).subscribe(() => this.mocks = this.mocks.filter(item => item.id !== id));
  }
}
