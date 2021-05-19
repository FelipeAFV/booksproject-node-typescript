import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BookAddComponent } from "./components/book-add/book-add.component";
import { BookEditComponent } from "./components/book-edit/book-edit.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookComponent } from "./components/book/book.component";
import { SecurityModule } from "./security.module";
import { BookService } from "./services/book/book.service";

@NgModule({
    declarations: [
        BookComponent,
        BookListComponent,
        BookAddComponent,
        BookEditComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        SecurityModule
    ],

    providers: [
        BookService
    ]
})
export class BookModule {

}