import { Injectable } from '@angular/core';
import { IMock } from '../mock.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MockListService {

  constructor(private http: HttpClient) {
  }

  public getAllMocks(): Observable<IMock[]> {
    return this.http.get<IMock[]>('api/mocks');
  }

  public deleteMock(id: number) {
    return this.http.delete<IMock>(`api/mocks/` + id);
  }
}
