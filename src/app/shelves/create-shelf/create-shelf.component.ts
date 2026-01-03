import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShelfService } from '../shelf.service';

@Component({
  selector: 'app-create-shelf',
  templateUrl: './create-shelf.component.html',
  styleUrls: ['./create-shelf.component.css']
})
export class CreateShelfComponent {
  shelfForm!: FormGroup;
  message = '';

  // temporary: userId passed via query or stored value
  userId = '';

  constructor(
    private fb: FormBuilder,
    private shelfService: ShelfService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Option 1: read userId from query param
    this.userId = this.route.snapshot.queryParamMap.get('userId') || '';

    this.shelfForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  createShelf(): void {
    if (this.shelfForm.invalid || !this.userId) {
      this.shelfForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.shelfForm.value.name,
      userId: this.userId
    };

    this.shelfService.createShelf(payload).subscribe({
      next: (res: any) => {
        this.message = res.msg;
        this.shelfForm.reset();
      },
      error: (err) => {
        this.message = err?.error?.msg || 'Failed to create shelf';
      }
    });
  }
}
