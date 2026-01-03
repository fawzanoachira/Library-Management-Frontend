import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "users", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: "", redirectTo: "users/get", pathMatch: "full" },
  { path: "**", redirectTo: "users/get" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
