import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdto } from "../../../Clases/userdto";
import { AuthenticationService } from "../../../services/authentication.service";
import { SessionStorageService } from "../../../services/session-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Logourl: string = 'assets/logo.png'; // Coloca aquí la URL de tu logo
  LoginImg: string = 'assets/login-background.jpg'; // Coloca aquí la URL de tu imagen de fondo

  username: string = '';
  password: string = '';

  constructor(
    private authentication: AuthenticationService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // No se requiere cargar configuración adicional
  }

  login() {
    let userDto = new Userdto(this.username, this.password);
    this.authentication.login(userDto).subscribe(
      token => {
        console.log(token);
        this.sessionStorage.setItem('token', token);
        if (token.type == 'ADMIN') {
          this.router.navigate(['/admin/product']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        console.log(error);
        alert('Invalid credentials, please try again');
      }
    );
    console.log(userDto);
  }
}
