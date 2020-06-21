import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService } from '../../services/auth.service';
import {User } from '../../models/user.class';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { threadId } from 'worker_threads';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  personType = 'passenger'
  email: string;
  password: string;
  loginForm: FormGroup;
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
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 dígitos.'}
    ],
    phone: [
      { type: 'required', message: 'El celular es requerido.' },
      { type: 'minlength', message: 'El celular debe tener al menos 8 dígitos.'},
      // { type: 'pattern', message: 'Solo debe ingresar números.'}
    ]
  };

  passwordTypeInput = 'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword = 'eye-off';
  // Variable para cambiar dinamicamente el nombre del Icono que por defecto sera un ojo cerrado

  constructor(
    public authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    public formBuilder: FormBuilder,
    ) {
      this.loginForm = this.formBuilder.group({
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
        ])),
      });
    }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail);
    this.personType = ev.detail.value;
    console.log(this.personType);
  }

  async onRegister() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Porfavor espere...',
      // duration: 2000
    });
    loading.present();
    const value = {};
    value['email'] = this.loginForm.get('email').value;
    value['password'] = this.loginForm.get('password').value;
    this.authService.registerUser(value).then(res => {
      this.user.email = res.user.email;
      this.user.uid = res.user.uid;
      this.user.role = this.personType;
      this.user.name = this.loginForm.get('name').value;
      this.user.phone = this.loginForm.get('phone').value;
      this.storage.set('userAuth', this.user);
      this.createUser(this.user);
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
      // this.errorMessage = error.message;
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
    this.authService.createUser(record).then(resp => {
      this.navCtrl.navigateForward('/home');
    }).catch(error => {
      console.log(error);
      this.presentAlert();
    })
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

  // async register() {
  //   const user = await this.authService.onRegister(this.user);

  //   if(user){
  //     console.log('User created successfully');
  //     this.router.navigateByUrl('/home');
  //   }
  // }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

}
