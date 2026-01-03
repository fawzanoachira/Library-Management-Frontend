import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateShelfComponent } from './create-shelf/create-shelf.component';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { ShelfListComponent } from './shelf-list/shelf-list.component';

const routes: Routes = [
  { path: '', component: ShelfListComponent },
  { path: 'create', component: CreateShelfComponent },
  { path: ':id', component: ShelfDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelvesRoutingModule { }
