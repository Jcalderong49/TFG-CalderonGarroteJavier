import { Component, OnInit } from '@angular/core';
import { Product } from '../../Clases/product';
import { ProductService } from '../../Servicios/product.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('ProductListComponent initialized');
    this.listProducts();
  }

  listProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data || [];
        console.log('Products loaded:', this.products);
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  deleteProductById(id: number): void {
    Swal.fire({
      title: 'Está seguro que quiere eliminar el registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe(
          () => {
            this.listProducts();
            Swal.fire(
              'Productos',
              'Producto eliminado correctamente.',
              'success'
            );
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
      }
    });
  }
}
