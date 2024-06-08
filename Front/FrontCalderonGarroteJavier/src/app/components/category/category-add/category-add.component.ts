import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../Clases/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      id: [null], // Reemplazado 0 por null para que sea más genérico
      name: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, rellene todos los campos correctamente'
      });
      return;
    }

    const { id, name } = this.categoryForm.value;
    const category = new Category(id, name); // Utilizado const en lugar de let para category
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
        const id = params['id'];
        if (id) {
          this.categoryService.getCategoryById(id).subscribe(
            data => {
              this.categoryForm.patchValue({
                id: data.id,
                name: data.name
              });
            }
          );
        }
      }
    );
  }
}
