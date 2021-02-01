import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QueryService {
  apiURL = 'http://167.99.170.92'; // TODO: make dyamic based on environment

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllChimes(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/allChimes')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getSelectChimes(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/getSelectChimes?id=' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  addChime(details): Observable<any> {
    return this.http.post<any>(this.apiURL + '/addChime', JSON.stringify(details), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
