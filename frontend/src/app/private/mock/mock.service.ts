import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMock } from './mock.interface';

@Injectable()
export class MockService {

  constructor(private http: HttpClient) {
  }

  public addMock(mock: IMock): Observable<IMock> {
    return this.http.post<IMock>('api/mocks', mock);
  }

  public getMockById(id: string): Observable<IMock> {
    return this.http.get<IMock>(`api/mocks/` +id);
  }

  public editMock(mock: IMock): Observable<IMock> {
    return this.http.patch<IMock>(`api/mocks/` + mock.id, mock);
  }
}
