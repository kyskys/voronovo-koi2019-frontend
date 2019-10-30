import {Injectable} from '@angular/core';
import {Test} from '../../model/test';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../../model/page';

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
}
