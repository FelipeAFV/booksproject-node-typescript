import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../model/Book';

@Injectable()
export class BookService {

  private url: string = "http://localhost:5000/api/books";

  constructor(private http: HttpClient) {

  }

  public getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url, {
      withCredentials: true
    });
  }

  public deleteBookById(bookId) {
    return this.http.delete(this.url+'/'+bookId, {withCredentials: true});
  }
  
  public updateBook(book:Book) {
    
    return this.http.put(this.url, book, {withCredentials: true});
  }

  public createBook(body: Book) {
    return this.http.post(this.url, body, {withCredentials: true} )
  }
}
