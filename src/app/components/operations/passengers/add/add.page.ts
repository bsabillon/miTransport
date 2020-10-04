import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {Storage} from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.class';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';


import {PassengersService} from '../../../../services/passengers.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public currentUserId: string;
  user: User = new User();
  personType = 'passenger'
  email: string;
  password: string;
  registerClientForm: FormGroup;
  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es requerido.' },
    ],
    email: [
      { type: 'required', message: 'El correo es requerido.' },
      { type: 'pattern', message: 'Introduzca un correo valido.' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 dígitos.' }
    ],
    phone: [
      { type: 'required', message: 'El celular es requerido.' },
      { type: 'minlength', message: 'El celular debe tener al menos 8 dígitos.' },
      // { type: 'pattern', message: 'Solo debe ingresar números.'}
    ],

  };
  passwordTypeInput = 'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword = 'eye-off';
  // Variable para cambiar dinamicamente el nombre del Icono que por defecto sera un ojo cerrado

  constructor(
    public passengersServices: PassengersService, 
    public storage: Storage,
    public authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    ) { 
      this.registerClientForm = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
        ])),
        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern('/^-?(0|[1-9]\d*)?$/'),
        ]))
      });

    }

  ngOnInit() {
    this.getCurrentUser();
    //console.log(this.currentUserId);
  }

  async onRegister() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    const value = {};
    value['email'] =  this.registerClientForm.get('email').value;
    value['password'] = this.registerClientForm.get('password').value; 
    
    this.authService.registerUser(value).then(res => {
      this.user.email = res.user.email;
      this.user.uid = res.user.uid;
      this.user.role = this.personType;
      this.user.name = this.registerClientForm.get('name').value;
      this.user.phone = this.registerClientForm.get('phone').value;
      this.user.companyId = this.currentUserId;
      this.createUser(this.user);
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
      console.log(error);
      this.presentAlert();
    });
  }

  createUser(user) {
    const record = {};
    record['uid'] = user.uid;
    record['email'] = user.email;
    record['name'] = user.name;
    record['role'] = user.role;
    record['phone'] = user.phone;
    record['companyId'] = user.companyId;
    this.authService.createUser(record).then(resp => {
      this.navCtrl.navigateForward('/passengers-home');
    }).catch(error => {
      console.log(error);
      this.presentAlert();
    })
  }

  getCurrentUser(){
    this.storage.get('userAuth').then((data) => {
      if (data) {
       return this.currentUserId = data.uid;
      } else {
       return this.currentUserId = null;
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Subtitle',
      message: '¡El registro no se pudo realizar!',
      buttons: ['Entendido']
    });

    await alert.present();
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

}
