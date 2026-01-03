import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUserComponent } from './get-user/get-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { BooksModule } from "src/app/books/books.module";


@NgModule({
  declarations: [
    GetUserComponent,
    CreateUserComponent,
    UserDetailComponent,
    EditUserComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    BooksModule
]
})
export class UsersModule { }
