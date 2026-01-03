import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  editForm!: FormGroup;
  editMode = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBook(id);
  }

  loadBook(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (res: any) => {
        this.book = res.data;
        this.initForm();
      },
      error: () => {
        this.message = 'Book not found';
      }
    });
  }

  initForm(): void {
    this.editForm = this.fb.group({
      id: [this.book.id],
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      isbn: [this.book.isbn, Validators.required],
      genre: [this.book.genre],
      description: [this.book.description]
    });
  }

  enableEdit(): void {
    this.editMode = true;
    this.message = '';
  }

  cancelEdit(): void {
    this.editMode = false;
    this.initForm();
  }

  updateBook(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.bookService.updateBook(this.editForm.value).subscribe({
      next: (res: any) => {
        this.book = res.data;
        this.editMode = false;
        this.message = res.msg;
      },
      error: (err) => {
        this.message = err?.error?.msg || 'Update failed';
      }
    });
  }
}
