import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ItemCart } from "../../../Clases/item-cart";
import { CartService } from "../../../services/cart.service";
import { HomeService } from "../../../services/home.service";

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
  quantity: number = 1;

  constructor(
    private homeService: HomeService,
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
          this.homeService.getProductById(id).subscribe(
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
      icon: 'success',
      title: 'Producto añadido al carrito de compras',
      text: 'El producto ha sido añadido exitosamente al carrito.',
      timer: 1500,
      showConfirmButton: false
    });
  }
}
