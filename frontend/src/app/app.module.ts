import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CookieService } from "ngx-cookie-service";
import { SecurityModule } from './security.module';
import { BookModule } from './book.module';
import { TokenInterceptor } from './interceptors/TokenInterceptor';
import { AuthorsModule } from './authors/authors.module';
import { AuthorService } from './authors/services/author/author.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
    // BookListComponent,
    // BookComponent,
    // BookEditComponent,
    // BookAddComponent
    // AuthorListComponent,
    // AuthorComponent,
    // AuthorAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthorsModule,
    BookModule,
    SecurityModule
  ],
  providers: [ CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, AuthorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
