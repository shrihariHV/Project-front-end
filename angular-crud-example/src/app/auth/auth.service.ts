import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import {  throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user) {
    return this.httpClient.post(this.apiServer + '/users/login', JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      tap(resData => {
          this.handleAuthentication(resData['data']);
      })
    )
  }  

  signUp(user) {
    return this.httpClient.post(this.apiServer + '/users/register', JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      tap(resData => {
          this.handleAuthentication(resData['data']);
      })
    )
  }


  private handleAuthentication(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
    this.router.navigate(['/home']);
  }

  logout() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('token');
  }
 
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
