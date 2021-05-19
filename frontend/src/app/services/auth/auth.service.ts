import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { User } from '../../model/User';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: String = "http://localhost:5000";  
  private CURRENT_USER :string = 'user';
  private userData: User;

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  login(body) {
    return this.http.post(this.url + '/login', body,{
      withCredentials: true
    })
    .pipe(
      map((res: any) => {

        console.log('Response from server',res);
        // The user is stored, the user role is used to check access to routes
        this.tokenService.storeRefreshToken(res.REFRESH_TOKEN);
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(res));
        this.userData = res;
        this.router.navigate(['bookList'])
        return res;
      }),
      catchError((error) => {
        console.log(`${error} an error has ocurred`);
        return of(error);
      }
    ));
  }

  refresh(body) {
    return this.http.post(this.url + '/refresh', body,{
      withCredentials: true
    }).pipe(
      catchError((err) => {
        console.log('Error en metodo refresh', err);
        return throwError(err);
      }) 
    );
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER);
    return this.http.get(this.url +'/logout', {withCredentials: true});
  }

  // getCurrentUser():Observable<User> {
  //   return this.http.get<User>(this.url +'/api/users/userData', {withCredentials: true});
  //   // return this.userData;
  // }
}
