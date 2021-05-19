import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/model/Author';

@Injectable()
export class AuthorService {

  url: string = 'http://localhost:5000/api/authors'

  constructor(private http: HttpClient) { }

  public getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url, {withCredentials: true});
  }

  public addAuthor(body: Author) {
    return this.http.put(this.url, body, {withCredentials: true});
  }

  public deleteAuthor(authorId: number) {
    return this.http.delete(`${this.url}/${authorId}`, {withCredentials: true})
  }
}
