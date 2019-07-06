import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bugs } from './bug.model';

@Injectable({
  providedIn: 'root'
})
export class GetBugService {

  constructor(private http: HttpClient) { }

  private readonly endpoint = 'http://bug-report-system-server.herokuapp.com/bugs';

  getBugReport(page): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint + '?&page=' + page);
  }

  getBugReportSorted(sortBy, sortingDirection, page): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint + '?sort=' + sortBy + ',' + sortingDirection + '&page=' + page);
  }

  deleteBug(id): Observable<Bugs[]> {
    return this.http.delete<Bugs[]>(this.endpoint + '/' + id);
  }
  getSearchedBug(page, title, priority, reporter, status): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint + '?page=' + page + '&title=' + title + '&priority=' + priority + '&reporter=' + reporter + '&status=' + status);
  }

  getSearchedBugSorted(sortBy, sortingDirection, page, title, priority, reporter, status): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint + '?sort=' + sortBy + ',' + sortingDirection + '&page=' + page + '&title=' + title + '&priority=' + priority + '&reporter=' + reporter + '&status=' + status);
  }

}
