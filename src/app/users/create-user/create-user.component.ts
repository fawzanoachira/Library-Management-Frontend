import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createUser(formData: any): void {
    this.userService.createUser(formData).subscribe({
      next: (res: any) => {
        this.successMessage = res.msg;
        this.errorMessage = '';
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err?.error?.msg || 'Create failed';
      }
    });
  }
}
