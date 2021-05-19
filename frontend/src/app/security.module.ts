import { NgModule } from "@angular/core";
import { CheckRoleDirective } from "./directives/check-role.directive";
import { UserService } from "./services/user/user.service";


@NgModule({
    declarations: [
        CheckRoleDirective
    ],
    exports: [
        CheckRoleDirective
    ],
    providers: [
        UserService
    ]
})
export class SecurityModule {

}