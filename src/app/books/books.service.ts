import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../shared/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, book);
  }
  getAllBooks() {
    return this.http.get(`${this.baseUrl}/`);
  }
  getBookById(id: number) {
    return this.http.get(`${this.baseUrl}/get-book?id=${id}`);
  }
  updateBook(book: any) {
    return this.http.patch(`${this.baseUrl}/update-book`, book);
  }
  deleteBook(id: number) {
    return this.http.delete(`${this.baseUrl}/delete-book/${id}`);
  }

}
