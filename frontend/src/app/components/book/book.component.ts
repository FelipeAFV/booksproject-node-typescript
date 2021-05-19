import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/model/Book';

@Component({
  selector: '[app-book]',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Output()
  deleteEvent = new EventEmitter();
  
  @Output()
  updateEvent = new EventEmitter();


  @Input()
  book :Book;

  constructor() { }

  ngOnInit(): void {
  }

  public delete() {
    this.deleteEvent.emit(this.book);
  }

  public update() {
    this.updateEvent.emit(this.book);
  }

}
