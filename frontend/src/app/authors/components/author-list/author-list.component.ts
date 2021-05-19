import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/model/Author';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors: Author[];

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.authorService.getAllAuthors().subscribe(
      (data: Author[]) => {
        this.authors = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
        this.authors = [];
      }
    );
  }


  deleteAuthor(author: Author) {
    this.authorService.deleteAuthor(author.id).subscribe(
      (data) => {
        
        console.log(data);
        this.router.navigate(['/authorList']);
      },
      (err) => {
        console.log(err);
        this.authors = [];
      }
    );
  }
}
