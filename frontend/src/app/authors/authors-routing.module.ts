import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../model/enums/Role';
import { AuthGuardService } from '../services/guards/auth-guard.service';
import { RoleGuardService } from '../services/guards/role-guard.service';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService, RoleGuardService],
  data: {roles: [Role.ADMIN]}, component: AuthorListComponent},
  { path: 'add', canActivate: [AuthGuardService, RoleGuardService],
  data: {roles: [Role.ADMIN]}, component: AuthorAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
