import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataRequest } from 'src/app/model/interfaces/role-request';
import { Role } from "../../model/enums/Role";
import { User } from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<UserDataRequest> {
    return this.http.get<UserDataRequest>(this.url+'/users/userData', {withCredentials: true});
  }


}
