import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/Books.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-addbook-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addbook-modal.component.html',
  styleUrls: ['./addbook-modal.component.css'],
})
export class AddbookModalComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  fb = inject(FormBuilder);
  bookService = inject(BookService);
  matSnackBar = inject(MatSnackBar);
  private modalElement!: HTMLElement;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publishedDate: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.modalElement = document.getElementById('addBookModal')!;
  }

  openModal() {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement);
      modal.show();
    }
  }

  closeModal() {
    if (this.modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(
        this.modalElement
      );
      modal.hide();
    }
  }

  submit() {
    if (this.form.valid) {
      const formValue = this.form.value as Book; // Cast form value to the Book interface
      const token = localStorage.getItem('token') || ''; // Provide a default empty string if the token is null

      if (token) {
        // Check if the token is non-empty
        this.bookService.addBook(formValue, token).subscribe({
          next: (response) => {
            this.matSnackBar.open('Book added successfully!', 'Close', {
              duration: 3000,
            });
            this.closeModal();
          },
          error: (error) => {
            console.error('Error adding book:', error);
            this.matSnackBar.open(
              'Failed to add book. Please try again.',
              'Close',
              {
                duration: 3000,
              }
            );
          },
        });
      } else {
        console.log('No JWT token found in localStorage');
        this.matSnackBar.open(
          'Authentication error. Please log in again.',
          'Close',
          {
            duration: 3000,
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
