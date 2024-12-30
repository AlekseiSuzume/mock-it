import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILog } from './ILog';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private itemsSource = new BehaviorSubject<ILog[]>([]);
  currentItems$: Observable<ILog[]> = this.itemsSource.asObservable();

  constructor(private http: HttpClient) {
    this.fetchItems()
  }

  private getAllLogs(): Observable<ILog[]> {
    return this.http.get<ILog[]>('api/logs');
  }

  public fetchItems() {
   this.getAllLogs().subscribe(
      (data) => {
        this.itemsSource.next(data.sort((a, b) => b.id! - a.id!));
      });
  }
}
