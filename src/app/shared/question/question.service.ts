import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "./shared/model/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>('/questions', question);
  }
}
