import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogModel } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private itemsSource = new BehaviorSubject<LogModel[]>([]);
  currentItems$: Observable<LogModel[]> = this.itemsSource.asObservable();

  constructor(private http: HttpClient) {
    this.fetchItems()
  }

  private getAllLogs(): Observable<LogModel[]> {
    return this.http.get<LogModel[]>('api/logs');
  }

  public fetchItems() {
   this.getAllLogs().subscribe(
      (data) => {
        this.itemsSource.next(data.sort((a, b) => b.id! - a.id!));
      });
  }
}
