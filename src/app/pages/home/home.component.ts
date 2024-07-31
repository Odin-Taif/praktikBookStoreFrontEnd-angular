import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { AddbookModalComponent } from '../../components/addbook-modal/addbook-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, BookListComponent, AddbookModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
}
