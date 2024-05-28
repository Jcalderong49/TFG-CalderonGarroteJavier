import { Component, OnInit } from '@angular/core';
import { Product } from '../../Clases/product';
import { ProductService } from '../../Servicios/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private _productService: ProductService) {} // Properly closed the constructor

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      data => this.products = data
    );
  }
}
