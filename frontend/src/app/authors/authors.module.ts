import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorComponent } from './components/author/author.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorService } from './services/author/author.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SecurityModule } from '../security.module';


@NgModule({
  declarations: [
    AuthorComponent,
    AuthorListComponent,
    AuthorAddComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    ReactiveFormsModule,
    SecurityModule
  ],
  providers: [
    AuthorService
  ]
})
export class AuthorsModule { }
