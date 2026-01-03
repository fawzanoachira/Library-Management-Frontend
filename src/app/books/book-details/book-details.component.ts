import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.message = 'Invalid book id';
      return;
    }

    this.bookService.getBookById(id).subscribe({
      next: (res: any) => {
        this.book = res.data;
      },
      error: () => {
        this.message = 'Book not found';
      }
    });
  }
}
