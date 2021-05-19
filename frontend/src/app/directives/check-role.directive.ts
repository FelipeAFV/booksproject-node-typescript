import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../model/enums/Role';
import { UserDataRequest } from '../model/interfaces/role-request';
import { UserService } from '../services/user/user.service';

@Directive({
  selector: '[appCheckRole]'
})
export class CheckRoleDirective implements OnInit {

  @Input()
  appCheckRole: string[];

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
    private userService: UserService) { }

  ngOnInit(): void {

    console.log(this.appCheckRole);

    this.userService.getUserData().subscribe(
      (data:UserDataRequest) => {
        if (this.appCheckRole.includes(data.role)) {

          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      },
      (err) => {
        this.viewContainer.clear();
      }
    );
    
    
  }

}
