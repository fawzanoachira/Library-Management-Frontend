import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');

    if (!email) {
      this.errorMessage = 'Invalid user';
      return;
    }

    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      passwordHashed: ['', Validators.required]
    });

    // Fetch user using existing get-user API
    this.userService.getUserByEmail(email).subscribe({
      next: (response: any) => {
        const user = response.data;
        this.userId = user.id;

        this.userForm.patchValue({
          email: user.email,
          name: user.name
        });
      },
      error: (err) => {
        this.errorMessage = err?.error?.msg || 'User not found';
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const payload = {
      id: this.userId,
      ...this.userForm.value
    };

    this.userService.updateUser(payload).subscribe({
      next: (response: any) => {
        this.successMessage = response.msg;
        this.errorMessage = '';

        // Redirect to updated user detail
        this.router.navigate(['/users/email', response.data.email]);
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err?.error?.msg || 'Update failed';
      }
    });
  }
}
