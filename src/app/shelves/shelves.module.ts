import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelvesRoutingModule } from './shelves-routing.module';
import { ShelfListComponent } from './shelf-list/shelf-list.component';
import { CreateShelfComponent } from './create-shelf/create-shelf.component';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShelfListComponent,
    CreateShelfComponent,
    ShelfDetailComponent
  ],
  imports: [
    CommonModule,
    ShelvesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ShelvesModule { }
