import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitatService {
  private citatUrl = 'assets/citatdb.json'; // Path to your JSON file
  //   /Users/mjdthif/Desktop/priaktiAuth/client/src/assets/citatdb.ts
  constructor(private http: HttpClient) {}

  getCitat(): Observable<any[]> {
    return this.http.get<any[]>(this.citatUrl);
  }
}
