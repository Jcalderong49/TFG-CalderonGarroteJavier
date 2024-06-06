import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPayment } from '../Clases/data-payment';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8086/api/v1/payments/paypal';

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {}

  getUrlPaypalPayment(dataPayment: DataPayment): Observable<any> {
    const token = this.sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, dataPayment, { headers });
  }
}
