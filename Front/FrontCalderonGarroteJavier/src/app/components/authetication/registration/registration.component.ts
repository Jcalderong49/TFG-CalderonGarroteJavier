import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from "../../../Clases/user";
import { UserType } from "../../../Clases/user-type";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  address: string = '';
  cellphone: string = '';
  password: string = '';
  userType: string = '';

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.username = this.email;
    this.userType = UserType.USER;
    let user = new User(0, this.username, this.name, this.surname, this.email, this.address, this.cellphone, this.password, this.userType);
    this.authentication.register(user).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'Usuario'
        });
        console.log(res);
        this.router.navigate(['user/login']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: err.message
        });
        console.error(err);
      }
    );
  }
}
