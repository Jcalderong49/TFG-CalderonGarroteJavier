import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Componentes/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from './Componentes/home/home.component'; // Importa HomeComponent
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductAddComponent } from './Componentes/product-add/product-add.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CategoryAddComponent } from './Componentes/Categorias/category-add/category-add.component';
import { CategoryListComponent } from './Componentes/Categorias/category-list/category-list.component';
import { ItemCartComponent } from './Componentes/Carrito/item-cart/item-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductAddComponent,
    CategoryListComponent,
    ItemCartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Asegúrate de tener HttpClientModule importado aquí
    CommonModule,
    FormsModule,
    RouterModule,ReactiveFormsModule,
    CategoryAddComponent,

    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
