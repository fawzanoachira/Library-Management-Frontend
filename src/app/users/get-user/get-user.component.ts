import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent {
  userForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const email = this.userForm.value.email;

    this.userService.getUserByEmail(email).subscribe({
      next: (response: any) => {
        const userId = response.data.id;
        this.router.navigate(['/users', userId]);
      },
      error: (err) => {
        this.errorMessage = err?.error?.msg || 'User not found';
      }
    });
  }
}
