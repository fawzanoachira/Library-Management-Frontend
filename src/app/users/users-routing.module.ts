import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { GetUserComponent } from './get-user/get-user.component';

const routes: Routes = [
  { path: "get", component: GetUserComponent },
  { path: "create", component: CreateUserComponent },
  { path: "email/:email", component: UserDetailComponent },
  { path: "edit/:email", component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
