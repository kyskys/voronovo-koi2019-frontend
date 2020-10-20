import { Injectable } from '@angular/core';
import { Test } from '../../model/test';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../../model/page';
import { TestItem } from '../../model/test-item';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>('/tests', test);
  }

  updateTest(id: number, test: Test): Observable<Test> {
    return this.http.patch<Test>('/tests/' + id, test);
  }

  getTests(page: Page): Observable<any> {
    const params = new HttpParams()
      .set('size', page.size.toString())
      .set('page', page.page.toString())
      .set('sort', page.sort);
    return this.http.get<any>('/tests', {params: params});
  }

  deleteTests(ids: number[]): Observable<any> {
    return this.http.post('/tests/deleteAll', {value: [...ids]});
  }

  deleteTest(id: number): Observable<any> {
    return this.http.delete(`/tests/${id}`);
  }

  getTestInfo(id: number): Observable<any> {
    return this.http.get('/tests/' + id);
  }

  getTestItems(id: number): Observable<any> {
    return this.http.get(`/tests/${id}/items`);
  }

  updateTestItems(items: TestItem[], id: number): Observable<any> {
    items.forEach(item => item);
    return this.http.post(`/tests/${id}/items`, items);
  }

  getTestNames(): Observable<any> {
    return this.http.get(`/tests/names`);
  }

  getTestAnswers(id: number): Observable<any> {
    return this.http.get(`/tests/results/${id}`);
  }
}
