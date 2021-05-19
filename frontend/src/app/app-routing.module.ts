import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { RoleGuardService } from './services/guards/role-guard.service';
import { Role } from "./model/enums/Role";
import { BookAddComponent } from './components/book-add/book-add.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'bookList', component: BookListComponent, canActivate: [AuthGuardService]},
  { path: 'update', component: BookEditComponent, canActivate: [AuthGuardService, RoleGuardService],
    data: {roles: [Role.ADMIN]}},
  { path: 'home', component: HomeComponent},
  { path: 'bookAdd', component: BookAddComponent, canActivate: [AuthGuardService, RoleGuardService],
  data: {roles: [Role.ADMIN]}},
  { path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
