import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/enums/Role';
import { UserDataRequest } from 'src/app/model/interfaces/role-request';
import { User } from 'src/app/model/User';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private permissionService: UserService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return new Promise((resolve, reject) => {
      this.permissionService.getUserData().subscribe(
      (data:UserDataRequest) => {
        console.log(route.data.roles);
        if (route.data.roles.includes(data.role)) return resolve(true);
        this.router.navigate(['home']);
        return resolve(false)
        
      },
      (err) => {
        return reject(false);
      }
    );
   });
    
  
}
}
