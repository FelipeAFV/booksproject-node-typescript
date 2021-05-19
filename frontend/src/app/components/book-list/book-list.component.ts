import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService, private router:Router) {

  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
        console.log(data);
        console.log('Getting books');
      },
      (err) => {
        console.log(`An error has ocurred ${err}`);
      }
    )
  }

  deleteBook(book:Book) {
    this.bookService.deleteBookById(book.id).subscribe(
      (data:any) => {
        console.log(`Deleting book... response from server ${data.message}`);
      },
      (err) => {
        console.log(`Error deleting book... response from server ${err.message}`);
      }
    );
  }

  goToUpdate(book) {
    this.router.navigate(['update',book]);
  }

}
