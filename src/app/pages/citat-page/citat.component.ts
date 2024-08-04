import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CitatListComponent } from '../../components/citat-list/citat-list.component';

@Component({
  selector: 'app-citat',
  standalone: true,
  imports: [RouterLink, CitatListComponent],
  templateUrl: './citat.component.html',
  styleUrl: './citat.component.css',
})
export class CitatComponent {
  authService = inject(AuthService);
}
