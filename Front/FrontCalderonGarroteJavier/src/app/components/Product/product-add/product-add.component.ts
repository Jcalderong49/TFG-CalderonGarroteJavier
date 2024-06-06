import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from "../../../Clases/category";
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

  categories: Category[] = [];

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private sessionStorage: SessionStorageService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProductById();
    this.user = this.sessionStorage.getItem('token').id;
    this.userId = this.user.toString();
  }

  addProduct() {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.selectFile);
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);
    //console.log(formData.get('id'));
    console.log(formData);

    this.productService.createProduct(formData).subscribe(
      data => {
        console.log(data);
        if (this.id == 0) {
          Swal.fire('Success', 'Producto registrado correctamente', 'success');
        } else {
          Swal.fire('Success', 'Producto actualizado correctamente', 'success');
        }

        this.router.navigate(['admin/product']);
      }
    );

  }

  getProductById() {
    this.activatedRoute.params.subscribe(
      prod => {
        let id = prod['id'];
        if (id) {
          console.log('el valor de la variable id es: ' + id);
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
    return this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

}
