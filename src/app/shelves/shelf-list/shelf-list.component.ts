import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../shelf.service';

@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
  styleUrls: ['./shelf-list.component.css']
})
export class ShelfListComponent implements OnInit{
  shelves: any[] = [];
  message = '';

  constructor(private shelfService: ShelfService) { }

  ngOnInit(): void {
    this.shelfService.getAllShelves().subscribe({
      next: (res: any) => {
        this.shelves = res.data;
      },
      error: () => {
        this.message = 'Failed to load shelves';
      }
    });
  }
}
