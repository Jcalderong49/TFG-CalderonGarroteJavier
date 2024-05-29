import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Servicios/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Servicios/cart-service.service';
import { ItemCart } from "../../../Clases/item-cart";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  quantity: number = 0;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.activatedRoute.params.subscribe(
      p => {
        let id = p['id'];
        if (id) {
          this.productService.getProductById(id).subscribe(
            data => {
              this.id = data.id;
              this.name = data.name;
              this.description = data.description;
              this.urlImage = data.urlImage;
              this.price = data.price;
            }
          );
        }
      }
    );
  }

  addCart(id: number) {
    console.log('id product: ', id);
    console.log('name product: ', this.name);
    console.log('price product: ', this.price);
    console.log('quantity product: ', this.quantity);

    let item = new ItemCart(id, this.name, this.quantity, this.price);

    this.cartService.addItemCart(item);

    console.log("Total carrito: ");
    console.log(this.cartService.totalCart());

    Swal.fire({
      title: 'Success',
      text: 'Producto añadido al carrito de compras',
      icon: 'success',
      confirmButtonText: 'Seguir comprando',
      showCancelButton: true,
      cancelButtonText: 'Ver carrito'
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic for "Continue Shopping"
        console.log('User chose to continue shopping');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Logic for "View Cart"
        console.log('User chose to view cart');
        // You can navigate to the cart page or perform any other action here
      }
    });
  }
}
