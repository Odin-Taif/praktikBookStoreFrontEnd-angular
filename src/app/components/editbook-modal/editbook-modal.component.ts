import {
  Component,
  AfterViewInit,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../services/books.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-editbook-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editbook-modal.component.html',
  styleUrls: ['./editbook-modal.component.css'], // fix typo here
})
export class EditbookModalComponent implements OnInit, AfterViewInit {
  @Input() bookToEdit: Book | null = null; // Input to receive the book to be edited
  @Output() bookUpdated = new EventEmitter<Book>(); // Emit updated book to parent component

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
    this.modalElement = document.getElementById('editBookModal')!;
  }

  openModal(book: Book) {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement);
      this.setFormValues(book); // Set the form values with the book to be edited
      modal.show();
    }
  }

  setFormValues(book: Book) {
    this.form.setValue({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publishedDate: book.publishedDate,
    });
    this.bookToEdit = book;
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
    if (this.form.valid && this.bookToEdit) {
      const formValue = this.form.value as Book;
      const bookUpdated = { ...formValue, id: this.bookToEdit.id };
      const token = localStorage.getItem('token') || '';

      if (token) {
        this.bookService
          .updateBook(this.bookToEdit.id, bookUpdated, token)
          .subscribe({
            next: (updatedBook) => {
              if (updatedBook) {
                this.matSnackBar.open('Book updated successfully!', 'Close', {
                  duration: 3000,
                });

                this.closeModal();
                this.bookUpdated.emit(updatedBook); // Emit the updated book
              } else {
                console.error('Received empty response from backend.');
                this.matSnackBar.open(
                  'Failed to update book. Please try again.',
                  'Close',
                  {
                    duration: 3000,
                  }
                );
              }
            },
            error: (error) => {
              console.error('Error updating book:', error);
              this.matSnackBar.open(
                'Failed to update book. Please try again.',
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
      console.log('Form is invalid or bookToEdit is null');
    }
  }
}
