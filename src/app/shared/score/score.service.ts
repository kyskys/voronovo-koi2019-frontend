import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) {
  }

  getScores(page: Page): Observable<any> {
    const params = new HttpParams()
      .set('size', page.size.toString())
      .set('page', page.page.toString())
      .set('sort', page.sort);
    return this.http.get<any>('/scores', {params: params});
  }

  deleteScores(ids: number[]): Observable<any> {
    return this.http.post('/scores/deleteAll', {value: [...ids]});
  }
}
