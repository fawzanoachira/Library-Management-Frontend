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
  initialData: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email')!;

    this.userService.getUserByEmail(email).subscribe({
      next: (res: any) => {
        this.userId = res.data.id;
        this.initialData = {
          name: res.data.name,
          email: res.data.email
        };
      },
      error: (err) => {
        this.errorMessage = err?.error?.msg;
      }
    });
  }

  updateUser(formData: any): void {
    const payload = {
      id: this.userId,
      ...formData
    };

    this.userService.updateUser(payload).subscribe({
      next: (res: any) => {
        this.router.navigate(['/users/email', res.data.email]);
      },
      error: (err) => {
        this.errorMessage = err?.error?.msg;
      }
    });
  }

}
