import { Component, OnInit } from '@angular/core';
import { OrderState} from "../../Clases/order-state";
import { OrderService} from "../../Servicios/order.service";
import {SessionStorageService} from "../../Servicios/session-storage.service";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  standalone: true,
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private orderService:OrderService,
    private  sessionStorage:SessionStorageService

  ){

  }


  ngOnInit(): void {
    console.log(this.sessionStorage.getItem('order'));
    let order = this.sessionStorage.getItem('order');

    let formData = new FormData();

    formData.append('id',order.id);
    formData.append('state', OrderState.CONFIRMED.toString());

    this.orderService.updateOrder(formData).subscribe(
      data => {
        console.log(data)


      }
    );



  }

}
