import { Component, OnInit } from '@angular/core';
import { ItemCart } from "../../../Clases/item-cart";
import { CartService } from "../../../Servicios/cart-service.service";
import {UserService} from "../../../Servicios/user.service";
import {OrderProduct} from "../../../Clases/order-product";
import {OrderState} from "../../../Clases/order-state";
import {Order} from "../../../Clases/order";
import {OrderService} from "../../../Servicios/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  items : ItemCart [] = [];
  totalCart : number =0;
  firstName : string = '';
  lastName : string = '';
  email : string = '';
  address : string ='';
  orderProducts:OrderProduct [] = [];
  userId : number =0;

  constructor(private cartService:CartService,
              private userService:UserService,
              private orderService:OrderService,
  ){}


  ngOnInit(): void {
    console.log('ngOnInit');
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.getUserById(this.userId);

  }

  generateOrder(){
    this.items.forEach(
      item=>{
        let orderProduct = new OrderProduct(null, item.productId, item.quantity, item.price);
        this.orderProducts.push(orderProduct);
      }
    );

    let order = new Order(null, new Date(), this.orderProducts, this.userId, OrderState.CANCELLED);
    console.log('Order: '+ order.orderState);
    this.orderService.createOrder(order).subscribe(
      data => {
        console.log('Order creada con id: '+ data.id);
      }


    );



  }

  deleteItemCart(productId:number){
    this.cartService.deleteItemCart(productId);
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  getUserById(id:number){
    this.userService.getUserById(id).subscribe(
      data => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.address = data.address;
      }
    );
  }

}
