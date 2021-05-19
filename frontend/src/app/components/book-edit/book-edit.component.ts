import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  updateForm: FormGroup;

  @Input()
  book: Book;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) {
    
  }

  public updateBook() {
    this.bookService.updateBook(this.updateForm.value).subscribe(
      (data) => {
        console.log(`Book updated`, data)
        this.router.navigate(['bookList']);
      },
      (err) => {
        console.log(err)
        
      }
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:Book) => {
      console.log(params.id, params.title, params.publisher);
      this.updateForm = new FormGroup({
        id: new FormControl(params.id, Validators.required),
        title: new FormControl(params.title, Validators.required),
        publisher: new FormControl(params.publisher, Validators.required)
      
      })
    })
  }

}
