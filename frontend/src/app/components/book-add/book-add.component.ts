import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/authors/services/author/author.service';
import { Author } from 'src/app/model/Author';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  addForm: FormGroup;
  authors: Author[];

  constructor(private authorService: AuthorService, private bookService: BookService) { }

  ngOnInit(): void {
    this.authorService.getAllAuthors().subscribe(
      (data) => {
        this.authors = data;
        console.log('Authors retrieved')
        
      },
      (error) => {
        console.log('Error retriveing authors')

      }
    )

    this.addForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      publisher: new FormControl(null, Validators.required),
      authorId: new FormControl(null, Validators.required)
    })
  }

  createBook() {
    if (this.addForm.valid) {
      this.bookService.createBook(this.addForm.value).subscribe(
        (data) => {
          console.log('Book created successfully', data);
        },
        (err) => {
          console.log('Error creating book', err)
        }
      );

    }
  }
}
