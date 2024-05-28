import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Category} from "../../Clases/category";
import {CategoryService} from "../../Servicios/category.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{


  categories: Category [] = [];

  constructor(private categoryService:CategoryService, private toastr:ToastrService){}


  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

  deleteCategoryById(id:number){
    console.log('id de la categoria antes de eliminar: '+id);

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
          ()=> this.listCategories()
        );
        Swal.fire(
          'Categorías',
          'Categoría eliminado correctamente.',
          'success'
        )
      }
    })

  }

}
