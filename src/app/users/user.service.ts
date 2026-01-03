import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BASE_URL = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) { }

  createUser(payload: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/create`, payload);
  }
  getUserByEmail(email: string) {
    return this.http.get(
      `${this.BASE_URL}/get-user`,
      { params: { email } }
    );
  }
  updateUser(payload: any) {
    return this.http.put(`${this.BASE_URL}/update-user`, payload);
  }

}
