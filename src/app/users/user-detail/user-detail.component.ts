import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');

    if (!email) {
      this.errorMessage = 'Invalid user';
      return;
    }

    this.userService.getUserByEmail(email).subscribe({
      next: (response: any) => {
        this.user = response.data;
      },
      error: (err) => {
        this.errorMessage = err?.error?.msg || 'User not found';
      }
    });
  }

  editUser(): void {
    this.router.navigate(['/users/edit', this.user.email]);
  }
}
