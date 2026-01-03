import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  message = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.books = res.data;
      },
      error: () => {
        this.message = 'Failed to load books';
      }
    });
  }
}
