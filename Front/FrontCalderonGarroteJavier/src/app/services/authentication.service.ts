import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User} from "../Clases/user";
import { Observable } from 'rxjs';
import { Userdto} from "../Clases/userdto";
import { Jwtclient} from "../Clases/jwtclient";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl : string = 'http://localhost:8086/api/v1/security';

  constructor(private httpClient : HttpClient) { }


  register(user : User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl+"/register", user);
  }

  login(userDto:Userdto):Observable<Jwtclient>{
    return this.httpClient.post<Jwtclient>(this.apiUrl+"/login", userDto);

  }

}
