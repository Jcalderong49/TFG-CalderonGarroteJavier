import { Component, OnInit } from '@angular/core';
import { Product } from "../../Clases/product";
import { HomeService } from "../../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getProducts().subscribe(
      data => {
        this.products = data;
        this.applyFilter(); // Initialize view with all data
      }
    );
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
