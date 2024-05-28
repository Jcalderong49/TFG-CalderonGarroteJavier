import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { ProductListComponent } from './Componentes/product-list/product-list.component';
import { ProductAddComponent } from './Componentes/product-add/product-add.component';
import {CategoryListComponent} from "./Componentes/category-list/category-list.component";
import {CategoryAddComponent} from "./Componentes/category-add/category-add.component";

// Declarar las rutas fuera del decorador @NgModule
const routes: Routes = [
  { path: '', component: HomeComponent

   },
  { path: 'admin/product', component: ProductListComponent },
  { path: 'admin/product/addProduct', component: ProductAddComponent },
  { path: 'admin/product/addProduct/:id', component: ProductAddComponent },

  { path: 'admin/Category', component: CategoryListComponent },
  { path: 'admin/Category/addCategory', component: CategoryAddComponent },
  { path: 'admin/Category/addCategory/:id', component: CategoryAddComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
