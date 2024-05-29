import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Servicios/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Servicios/cart-service.service';
import { ItemCart } from '../../../Clases/item-cart';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private cartService: CartService,
    private router: Router // Asegúrate de inyectar el router aquí
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productService.getProductById(id).subscribe(
          data => {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.urlImage = data.urlImage;
            this.price = data.price;
          },
          error => {
            console.error('Error al obtener el producto:', error);
          }
        );
      }
    });
  }

  addCart() {
    console.log('id product:', this.id);
    console.log('name product:', this.name);
    console.log('price product:', this.price);
    console.log('quantity product:', this.quantity);

    const item = new ItemCart(this.id, this.name, this.quantity, this.price);
    this.cartService.addItemCart(item);

    console.log('Total carrito:', this.cartService.totalCart());

    Swal.fire({
      title: 'Success',
      text: 'Producto añadido al carrito de compras',
      icon: 'success',
      confirmButtonText: 'Seguir comprando',
      showCancelButton: true,
      cancelButtonText: 'Ver carrito'
    }).then(result => {
      if (result.isConfirmed) {
        console.log('User chose to continue shopping');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/cart/order']); // Redirigir a la página del carrito
        console.log('User chose to view cart');
      }
    });
  }
}
