import { Component } from '@angular/core';
import { Category } from "../../../Clases/category";
import { CategoryService } from "../../../Servicios/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'] // Asegúrate de usar 'styleUrls' en plural
})
export class CategoryListComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

  deleteCategoryById(id: number) {
    console.log('id de la categoria antes de eliminar: ' + id);

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
        this.categoryService.deleteCategoryById(id).subscribe(
          () => {
            this.listCategories();
            Swal.fire(
              'Categorías',
              'Categoría eliminada correctamente.',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la categoría.',
              'error'
            );
          }
        );
      }
    });
  }
}
