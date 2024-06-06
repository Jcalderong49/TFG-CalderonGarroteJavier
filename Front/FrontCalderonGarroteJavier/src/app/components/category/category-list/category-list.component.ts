import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Category } from "../../../Clases/category";
import { CategoryService } from "../../../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  categoriasPaginaActual: Category[] = [];
  searchTerm: string = '';
  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  paginasTotales: number[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data;
        this.applyFilter(); // Initialize view with all data
      },
      error => {
        Swal.fire('Error', 'Error retrieving categories from the server: ' + error.message, 'error');
      }
    );
  }

  deleteCategoryById(id: number) {
    Swal.fire({
      title: '¿Está seguro que quiere eliminar la categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryById(id).subscribe(
          response => {
            Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
            this.listCategories(); // Refresh the list
          },
          error => {
            Swal.fire('Error', 'No se pudo eliminar la categoría: ' + error.message, 'error');
          }
        );
      }
    });
  }

  onSearchTermChange() {
    this.applyFilter();
  }

  applyFilter() {
    this.filteredCategories = this.categories.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.actualizarPaginacion();
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    const totalPaginas = Math.ceil(this.filteredCategories.length / this.itemsPorPagina);
    this.paginasTotales = Array.from({ length: totalPaginas }, (_, i) => i + 1);
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.categoriasPaginaActual = this.filteredCategories.slice(inicio, fin);
  }

  shouldShowPage(pagina: number): boolean {
    const buffer = 2; // Display page links near current page
    return pagina === 1 || pagina === this.paginasTotales.length || Math.abs(pagina - this.paginaActual) <= buffer;
  }

  shouldShowEllipsis(pagina: number): boolean {
    const buffer = 2;
    return pagina !== 1 && pagina !== this.paginaActual - buffer && pagina !== this.paginaActual + buffer && pagina !== this.paginasTotales.length;
  }
}
