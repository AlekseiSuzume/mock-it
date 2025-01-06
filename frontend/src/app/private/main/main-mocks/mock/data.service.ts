import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MockService } from './mock.service';
import { MockModel } from './mock.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private itemsSource = new BehaviorSubject<MockModel[]>([]);
  currentItems$: Observable<MockModel[]> = this.itemsSource.asObservable();

  constructor(private mockService: MockService) {
  }

  fetchItems() {
    this.mockService.getAllMocks().subscribe(
      (data) => {
        this.itemsSource.next(data.sort((a, b) => b.id! - a.id!));
      });
  }

  saveItem(item: MockModel) {
    if (item.id) {
      return this.mockService.editMock(item);
    } else {
      return this.mockService.addMock(item);
    }
  }

  deleteItem(itemId: number) {
    return this.mockService.deleteMock(itemId);
  }

}
