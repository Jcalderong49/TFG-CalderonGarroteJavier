import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Clases/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl: string = 'http://localhost:8086/api/v1/users';

  constructor(private httpClient:HttpClient, ) { }

  getUserById(id:number):Observable<User>{
    //return this.httpClient.get<User>(this.apiUrl+'/'+id);
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }


}
