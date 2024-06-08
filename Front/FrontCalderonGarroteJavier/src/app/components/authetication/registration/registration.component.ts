import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from "../../../Clases/user";
import { UserType } from "../../../Clases/user-type";
import { AuthenticationService } from "../../../services/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, rellene todos los campos correctamente'
      });
      return;
    }

    const { name, surname, email, address, cellphone, password } = this.registerForm.value;
    const username = email;
    const userType = UserType.USER;
    let user = new User(0, username, name, surname, email, address, cellphone, password, userType);

    this.authentication.register(user).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'Usuario registrado con éxito'
        });
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
