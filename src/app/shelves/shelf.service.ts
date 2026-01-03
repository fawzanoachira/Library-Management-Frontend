import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  private baseUrl = 'http://localhost:8080/api/shelf';

  constructor(private http: HttpClient) { }

  createShelf(payload: { name: string; userId: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, payload);
  }
}
