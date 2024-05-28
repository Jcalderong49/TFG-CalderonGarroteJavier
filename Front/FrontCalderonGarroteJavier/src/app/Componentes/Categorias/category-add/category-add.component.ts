import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../../Servicios/category.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "../../../Clases/category";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  id: number = 0;
  name: string = '';

  constructor(private categoryService: CategoryService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory() {
    console.log(this.name);
    let category = new Category(this.id, this.name);
    this.categoryService.createCategory(category).subscribe(
      res => {
        Swal.fire(
          'Categorias',
          'Categoría registrada correctamente',
          'success'
        );
        this.router.navigate(['admin/category']);
      },
      error => {
        Swal.fire(
          'Error',
          'Hubo un problema al registrar la categoría',
          'error'
        );
      }
    );
  }

  getCategoryById() {
    this.activatedRoute.params.subscribe(
      category => {
        let id = category['id'];
        if (id) {
          console.log('Valor de la variable id: ' + id);
          this.categoryService.getCategoryById(id).subscribe(
            data => {
              this.id = data.id;
              this.name = data.name;
            },
            error => {
              Swal.fire(
                'Error',
                'Hubo un problema al obtener la categoría',
                'error'
              );
            }
          );
        }
      }
    );
  }
}
