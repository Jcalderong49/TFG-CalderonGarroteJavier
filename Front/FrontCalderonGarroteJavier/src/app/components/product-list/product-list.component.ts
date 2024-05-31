import { Component, OnInit } from '@angular/core';


import Swal from 'sweetalert2';
import {Product} from "../../Clases/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];

  constructor(private productService:ProductService ){}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    console.log('listProducts');
    this.productService.getProducts().subscribe(
      data => {this.products = data
        console.log(data);
      }
    );
  }

  deleteProductById(id:number){

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
          ()=> this.listProducts()
        );
        Swal.fire(
          'Productos',
          'Producto eliminado correctamente.',
          'success'
        )
      }
    })



  }

}
