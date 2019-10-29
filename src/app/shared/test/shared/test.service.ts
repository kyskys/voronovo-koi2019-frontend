import { Injectable } from '@angular/core';
import { Test } from '../../model/test';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  createTest(test: Test): Observable<Test> {
    return this.http.post('/tests', test);
  }
}
