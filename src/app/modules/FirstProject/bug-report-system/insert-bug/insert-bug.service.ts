import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bugs } from '../get-bug/bug.model';

@Injectable({
  providedIn: 'root'
})
export class InsertBugService {

  private readonly endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }

  createBugReport(newBug: Bugs) {
    this.http.post(this.endpoint, newBug).subscribe(responseData => {
    });
  }
}

