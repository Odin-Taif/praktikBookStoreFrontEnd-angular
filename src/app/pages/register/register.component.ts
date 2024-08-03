import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../interfaces/register-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  fb = inject(FormBuilder);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      roles: this.fb.array([]), // Assuming roles can be selected later or modified
    });
  }

  signup() {
    if (this.form.valid) {
      this.authService.signUp(this.form.value).subscribe({
        next: (response) => {
          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.matSnackBar.open(error.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        },
      });
    } else {
      this.matSnackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
      });
    }
  }
}
