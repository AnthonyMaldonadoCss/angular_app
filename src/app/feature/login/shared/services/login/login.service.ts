import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { user, userToken } from './models/user.interface';

import { catchError, map } from 'rxjs/operators';
import { userInterface } from './models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedId = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // this.readToken();
  }

  get islogged(): Observable<boolean> {
    return this.loggedId.asObservable();
  }

  /**
   * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  login(logindata: user): Observable<void> {
    return this.http.post<user>(`${environment.API_URL}`, logindata).pipe(
      map((res: userToken) => {
        console.log(res);
        this.saveToken(res.token);
        this.loggedId.next(true);
        // return res;
      }),
      catchError((err) => this.handlerError(err)),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedId.next(false);
  }
  // private readToken(): void {
  //   const usertoken = localStorage.getItem('token');
  //   const isExpired = helper.isTokenExpired(usertoken);
  //   console.log(`is Expired ${isExpired}`);
  //   set userisLoged = isExpired
  // }
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'an Error ocurred';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
