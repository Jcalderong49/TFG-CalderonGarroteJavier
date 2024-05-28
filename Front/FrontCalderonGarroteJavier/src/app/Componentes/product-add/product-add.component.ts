import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../Servicios/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  id: number = 0;
  userId: string = '1';
  categoryId: string = '3';
  isEdit: boolean = false;
  productForm!: FormGroup;
  selectFile!: File;
  currentImageUrl: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      urlImage: ['']
    });

    this.activateRouter.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.isEdit = true;
        this.getProductById(this.id);
      }
    });
  }

  addProduct(): void {
    const formData: FormData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.productForm.value.code);
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price.toString());
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);

    if (this.selectFile) {
      formData.append('image', this.selectFile);
    } else if (this.isEdit && this.currentImageUrl) {
      formData.append('urlImage', this.currentImageUrl);
    }

    if (this.isEdit) {
      this.productService.updateProduct(this.id, formData).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Producto Editado',
          text: 'El producto ha sido editado exitosamente.'
        });
        this.router.navigate(['/admin/product']);
      }, error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al editar el producto.'
        });
      });
    } else {
      this.productService.createProduct(formData).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Producto Creado',
          text: 'El producto ha sido creado exitosamente.'
        });
        this.router.navigate(['/admin/product']);
      }, error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear el producto.'
        });
      });
    }
  }

  getProductById(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue({
        code: product.code,
        name: product.name,
        description: product.description,
        price: product.price,
        urlImage: product.urlImage
      });
      this.currentImageUrl = product.urlImage;
    }, error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cargar el producto.'
      });
    });
  }

  onFileSelected(event: any): void {
    this.selectFile = event.target.files[0];
  }
}
