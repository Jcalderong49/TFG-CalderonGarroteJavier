import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataPayment} from "../Clases/data-payment";
import { Observable } from 'rxjs';
import { UrlPaypalResponse} from "../Clases/url-paypal-response";
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl:string='http://localhost:8086/api/v1/payments';

  constructor(private http:HttpClient, private headerService : HeaderService) { }

  getUrlPaypalPayment(dataPayment:DataPayment):Observable<UrlPaypalResponse>{
    console.log('Header:'+this.headerService.headers.get('Content-Type'))
    return this.http.post<UrlPaypalResponse>(this.apiUrl, dataPayment, { headers: this.headerService.headers });
  }

}
