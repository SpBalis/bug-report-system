import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bugs } from '../get-bug/bug.model';

@Injectable({
  providedIn: 'root'
})
export class EditBugService {

  constructor(private http: HttpClient) { }

  getBugReport(col): Observable<Bugs> {
    return this.http.get<Bugs>('https://bug-report-system-server.herokuapp.com/bugs/' + col);
  }

  updateBugReport(savedId, editBug: Bugs): Observable<Bugs> {
    console.log(editBug);
    return this.http.put<Bugs>('https://bug-report-system-server.herokuapp.com/bugs/' + savedId, editBug);
  }

}
