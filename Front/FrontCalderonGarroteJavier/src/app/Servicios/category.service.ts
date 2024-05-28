import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../Clases/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl: string = 'http://localhost:8086/api/v1/admin/categories';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, { headers: this.headers });
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { headers: this.headers });
  }

  deleteCategoryById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

}
