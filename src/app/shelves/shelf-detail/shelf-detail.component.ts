import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelfService } from '../shelf.service';
import { BookService } from 'src/app/books/books.service';

@Component({
  selector: 'app-shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.css']
})
export class ShelfDetailComponent implements OnInit {
  shelf: any;
  message = '';
  bookId!: number;
  successMsg = '';
  errorMsg = '';
  books: any[] = [];
  selectedBookId!: number;

  constructor(
    private route: ActivatedRoute,
    private shelfService: ShelfService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.message = 'Invalid shelf id';
      return;
    }

    this.shelfService.getShelfById(id).subscribe({
      next: (res: any) => {
        this.shelf = res.data;
      },
      error: () => {
        this.message = 'Shelf not found';
      }
    });
    this.bookService.getAllBooks().subscribe(
      (res: any) => this.books = res.data
    );
  }
  addBook() {
    if (!this.selectedBookId) {
      this.errorMsg = 'Please select a book';
      return;
    }

    this.shelfService
      .addBookToShelf(this.shelf.id, this.selectedBookId)
      .subscribe({
        next: () => {
          this.successMsg = 'Book added to shelf successfully';
          this.errorMsg = '';
          this.selectedBookId = undefined as any;

          this.shelfService.getShelfById(this.shelf.id).subscribe(
            (res: any) => this.shelf = res.data
          );
        },
        error: () => {
          this.errorMsg = 'Failed to add book';
          this.successMsg = '';
        }
      });
  }

}
