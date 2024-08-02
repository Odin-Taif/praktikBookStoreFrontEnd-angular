import {
  Component,
  OnInit,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Book } from '../../interfaces/book';
// Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/Books.service';
import { AddbookModalComponent } from '../addbook-modal/addbook-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, AddbookModalComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, AfterViewInit {
  books: Book[] = [];
  token = localStorage.getItem('token') || '';
  bookService = inject(BookService);
  matSnackBar = inject(MatSnackBar);
  matDialog = inject(MatDialog);

  @ViewChild(AddbookModalComponent) addbookModal!: AddbookModalComponent;

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log(data);
      },

      error: (err) => {
        console.error('Failed to fetch books', err);
      },
    });
  }

  ngAfterViewInit(): void {
    // Use this.addbookModal to access the methods of AddbookModalComponent
  }

  openAddBookModal() {
    console.log('ehlllo form modal');

    if (this.addbookModal) {
      this.addbookModal.openModal();
    }
  }

  deleteBook(bookId: number) {
    const token = localStorage.getItem('token') || ''; // Retrieve the JWT token

    if (token) {
      // Open confirmation dialog
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: { message: 'Are you sure you want to delete this book?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Proceed with deletion
          this.bookService.deleteBook(bookId, token).subscribe({
            next: () => {
              this.matSnackBar.open('Book deleted successfully!', 'Close', {
                duration: 3000,
              });
              // Optionally, reload the list of books or update UI
            },
            error: (error) => {
              console.error('Error deleting book:', error);
              this.matSnackBar.open(
                'Failed to delete book. Please try again.',
                'Close',
                {
                  duration: 3000,
                }
              );
            },
          });
        }
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
  }
}
