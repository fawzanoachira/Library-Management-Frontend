import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelfService } from '../shelf.service';

@Component({
  selector: 'app-shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.css']
})
export class ShelfDetailComponent implements OnInit{
  shelf: any;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private shelfService: ShelfService
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
  }
}
