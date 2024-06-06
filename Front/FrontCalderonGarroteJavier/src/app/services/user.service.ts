import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Clases/user';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'http://localhost:8086/api/v1/users';

  constructor(private httpClient: HttpClient, private headerService: HeaderService) {}

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${userId}`, { headers: this.headerService.headers });
  }
}
