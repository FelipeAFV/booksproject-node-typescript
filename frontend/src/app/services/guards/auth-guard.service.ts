import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../model/User';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private router: Router, private userService: UserService) { 

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
 
    return new Promise((resolve, reject) => {
       this.userService.getUserData().subscribe(
         (data) => {
           return resolve(true);
          },
          (err) => {
            console.log(err);
           console.log('User not authenticated');
           this.router.navigate(['/login']);
           return reject(false);
         }
       )
    });
    // console.log(user.username);
    
  }
}
