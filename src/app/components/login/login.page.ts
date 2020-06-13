import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService } from '../../services/auth.service';
import {User } from '../../models/user.class';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: 'El correo es requerido.' },
      { type: 'pattern', message: 'Introduzca un correo valido.' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 dígitos.'}
    ]
  };

  passwordTypeInput = 'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword = 'eye-off';
  // Variable para cambiar dinamicamente el nombre del Icono que por defecto sera un ojo cerrado

  constructor(
    public authService: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
    ) {
      this.loginForm = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
        ])),
      });
     }

  ngOnInit() {
  }

  onLogin(){
    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;
    this.login();
  }

  async login() {
    const user = await this.authService.onLogin(this.user);
    if (user) {
      this.router.navigateByUrl('/home');
      console.log('User logged in successfully');
    }
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

}