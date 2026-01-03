import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      passwordHashed: ["", Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    console.log("Form Value", this.userForm.value);

    this.userService.createUser(this.userForm.value).subscribe({
      next: (response) => {
        this.successMessage = response.msg;
        this.errorMessage = '';
        this.userForm.reset();
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err?.error?.msg || 'Something went wrong';
      }
    });

  }
}
