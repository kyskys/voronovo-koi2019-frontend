import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryNameService {
  private readonly categories: Map<string, string>;

  constructor(private http: HttpClient) {
    this.categories = new Map<string, string>();
    this.initCategories().subscribe(categories => {
      Object.entries(categories).forEach(entry =>
        this.categories.set(entry[0], entry[1]));
    });
  }

  private initCategories(): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(`/categoryNames`);
  }

  getCategories(): Map<string, string> {
    return this.categories;
  }
}
