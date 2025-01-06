import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockModel } from './mock.model';

@Injectable()
export class MockService {

  constructor(private http: HttpClient) {
  }

  public getAllMocks(): Observable<MockModel[]> {
    return this.http.get<MockModel[]>('api/mocks');
  }

  public addMock(mock: MockModel): Observable<MockModel> {
    return this.http.post<MockModel>('api/mocks', mock);
  }

  public getMockById(id: string): Observable<MockModel> {
    return this.http.get<MockModel>(`api/mocks/` +id);
  }

  public editMock(mock: MockModel): Observable<MockModel> {
    return this.http.patch<MockModel>(`api/mocks/` + mock.id, mock);
  }

  public deleteMock(id: number) {
    return this.http.delete<MockModel>(`api/mocks/` + id);
  }
}
