import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/Books`);
  }

  addBook(book: Book, token: string): Observable<Book> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Book>(`${this.apiUrl}/Books`, book, { headers });
  }

  updateBook(id: number, book: Book, token: string): Observable<Book> {
    // console.log(book);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<Book>(`${this.apiUrl}/Books/${id}`, book, { headers });
  }

  deleteBook(bookId: number, token: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>(`${this.apiUrl}/Books/${bookId}`, {
      headers,
    });
  }
}
