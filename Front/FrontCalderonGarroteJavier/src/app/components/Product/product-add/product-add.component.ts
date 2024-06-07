import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from "../../../services/product.service";
import { CategoryService } from "../../../services/category.service";
import { SessionStorageService } from "../../../services/session-storage.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  id: number = 0;
  code: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  userId: string = '0';
  categoryId: string = '3';
  user: number = 0;

  selectFile!: File;
  categories: any[] = [];

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProductById();
    const user = this.sessionStorage.getItem('token');
    if (user && user.id) {
      this.userId = user.id.toString();
    }
  }

  addProduct() {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    if (this.selectFile) {
      formData.append('image', this.selectFile);
    }
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);

    this.productService.createProduct(formData).subscribe(
      data => {
        console.log(data);
        if (this.id === 0) {
          Swal.fire('Success', 'Producto registrado correctamente', 'success');
        } else {
          Swal.fire('Success', 'Producto actualizado correctamente', 'success');
        }
        this.router.navigate(['admin/product']);
      },
      error => {
        console.error('Error creating product', error);
        Swal.fire('Error', 'No se pudo crear el producto. Verifique sus permisos.', 'error');
      }
    );
  }

  getProductById() {
    this.activatedRoute.params.subscribe(
      prod => {
        const id = prod['id'];
        if (id) {
          this.productService.getProductById(id).subscribe(
            data => {
              this.id = data.id;
              this.code = data.code;
              this.name = data.name;
              this.description = data.description;
              this.urlImage = data.urlImage;
              this.price = data.price;
              this.userId = data.userId;
              this.categoryId = data.categoryId;
            }
          );
        }
      }
    );
  }

  onFileSelected(event: any) {
    this.selectFile = event.target.files[0];
  }

  getCategories() {
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }
}
