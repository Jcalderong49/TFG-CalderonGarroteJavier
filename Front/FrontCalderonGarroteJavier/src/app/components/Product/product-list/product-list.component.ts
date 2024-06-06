import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from "../../../Clases/product";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productosFiltrados: Product[] = [];
  productosPaginaActual: Product[] = [];
  searchTerm: string = '';
  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  paginasTotales: number[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.products.sort((a, b) => b.id - a.id);
        this.filterProducts();
      }
    );
  }

  deleteProductById(id: number) {
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
            Swal.fire(
              'Error',
              'No se pudo eliminar el producto.',
              'error'
            );
            console.error(error);
          }
        );
      }
    });
  }

  onSearchTermChange() {
    this.filterProducts();
  }

  filterProducts() {
    const productosFiltrados = this.products.filter(producto =>
      producto.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      producto.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      producto.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      producto.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.productosFiltrados = productosFiltrados;
    this.actualizarPaginacion();
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    const totalPaginas = Math.ceil(this.productosFiltrados.length / this.itemsPorPagina);
    this.paginasTotales = Array.from({ length: totalPaginas }, (_, i) => i + 1);
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.productosPaginaActual = this.productosFiltrados.slice(inicio, fin);
  }

  shouldShowPage(pagina: number): boolean {
    const buffer = 1;
    return pagina === 1 || pagina === this.paginasTotales.length || Math.abs(pagina - this.paginaActual) <= buffer;
  }

  shouldShowEllipsis(pagina: number): boolean {
    const buffer = 1;
    return pagina !== 1 && pagina !== this.paginaActual - 1 && pagina !== this.paginaActual + 1 && pagina !== this.paginasTotales.length;
  }
}
