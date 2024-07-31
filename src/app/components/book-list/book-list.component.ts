import { Component } from '@angular/core';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  book: Book = {
    id: 1,
    title: 'Totot',
    author: 'toooot',
    isbn: '123123fsdfasdf',
    publishedDate: new Date('2024-07-04'),
  };
}
