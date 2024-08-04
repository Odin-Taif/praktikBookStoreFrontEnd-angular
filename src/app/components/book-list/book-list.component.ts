import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { Book } from '../../interfaces/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/books.service';
import { AddbookModalComponent } from '../addbook-modal/addbook-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditbookModalComponent } from '../editbook-modal/editbook-modal.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, AddbookModalComponent, EditbookModalComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, AfterViewInit {
  books: Book[] = [];
  token = localStorage.getItem('token') || '';
  bookService = inject(BookService);
  matSnackBar = inject(MatSnackBar);
  matDialog = inject(MatDialog);

  @ViewChild(AddbookModalComponent, { static: false })
  addbookModal!: AddbookModalComponent;
  @ViewChild(EditbookModalComponent, { static: false })
  editbookModal!: EditbookModalComponent;

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Failed to fetch books', err);
      },
    });
  }

  ngAfterViewInit(): void {
    // console.log('AddbookModalComponent:', this.addbookModal);
    // console.log('EditbookModalComponent:', this.editbookModal);

    if (this.addbookModal) {
      this.addbookModal.bookAdded.subscribe((newBook: Book) => {
        this.books.push(newBook); // Add the new book to the list
      });
    } else {
      console.error('AddbookModalComponent is not initialized.');
    }

    if (this.editbookModal) {
      this.editbookModal.bookUpdated.subscribe((updatedBook: Book | null) => {
        if (updatedBook) {
          const index = this.books.findIndex(
            (book) => book.id === updatedBook.id
          );
          if (index !== -1) {
            this.books[index] = updatedBook; // Update the list with the edited book
          } else {
            console.warn('Book to update not found in list');
          }
        } else {
          console.error('Received null or undefined updatedBook');
        }
      });
    } else {
      console.error('EditbookModalComponent is not initialized.');
    }
  }

  openAddBookModal() {
    if (this.addbookModal) {
      this.addbookModal.openModal();
    }
  }

  openEditBookModal(book: Book) {
    if (this.editbookModal) {
      this.editbookModal.openModal(book);
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
              this.books = this.books.filter((book) => book.id !== bookId); // Remove the deleted book from the list
              this.matSnackBar.open('Book deleted successfully!', 'Close', {
                duration: 3000,
              });
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
