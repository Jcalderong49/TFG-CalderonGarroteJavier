import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from "../../../Clases/category";
import { CategoryService } from "../../../services/category.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  id: number = 0;
  name: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory() {
    console.log(this.name);
    let category = new Category(this.id, this.name);
    this.categoryService.createCategory(category).subscribe(
      res => {
        Swal.fire({
          title: '¡Categoría registrada!',
          text: 'La categoría se ha registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['admin/category']);
        });
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar la categoría.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  getCategoryById() {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          console.log('Valor de la variable id: ' + id);
          this.categoryService.getCategoryById(id).subscribe(
            data => {
              this.id = data.id;
              this.name = data.name;
            }
          );
        }
      }
    );
  }
}
