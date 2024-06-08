import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  logoUrl: string;
  isMenuOpen: boolean = false; // Agregamos esta variable para controlar el estado del menú

  constructor(private sessionStorage: SessionStorageService) {
    this.logoUrl = 'http://localhost:8086/images/Logo.png';
  }

  ngOnInit(): void {
    const token = this.sessionStorage.getItem('token');
    if (token && token.type === UserType.ADMIN) {
      this.isAdmin = true;
      this.isAuthenticated = true; // El usuario está autenticado
    }
  }

  toggleMenu() {
    // Cambia el estado del menú entre abierto y cerrado
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    // Elimina el token de la sesión y establece el estado de autenticación en falso
    this.sessionStorage.removeItem('token');
    this.sessionStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
