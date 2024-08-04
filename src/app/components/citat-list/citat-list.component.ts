import { CommonModule } from '@angular/common';
import { Citat } from '../../interfaces/citat';
import { Component, OnInit } from '@angular/core';
import { CitatService } from '../../services/citat.service';

@Component({
  selector: 'app-citat-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citat-list.component.html',
  styleUrl: './citat-list.component.css',
})
export class CitatListComponent implements OnInit {
  citat: Citat[] = [];

  constructor(private citatService: CitatService) {}
  ngOnInit(): void {
    this.citatService.getCitat().subscribe((data) => {
      this.citat = data;
    });

    console.log(this.citat);
  }
}
