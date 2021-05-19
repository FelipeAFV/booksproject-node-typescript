import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Author } from 'src/app/model/Author';

@Component({
  selector: '[app-author]',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input()
  author: Author;

  @Output()
  deleteEvent = new EventEmitter();

  constructor() { }

  deleteRequest() {
    this.deleteEvent.emit(this.author);
  }

  ngOnInit(): void {
  }

}
