import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService } from '../../services/auth.service';
import {User } from '../../models/user.class';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  getUserSubscription: Subscription;
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
    public alertController: AlertController,
    public loadingController: LoadingController,
    private storage: Storage,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
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

     ngOnDestroy() {
     ((this.getUserSubscription) !== undefined ? this.getUserSubscription.unsubscribe() : '');
    }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async onLogin(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    const user = {};
      this.authService.loginUser(this.loginForm.value)
      .then((res) => {
        user['email'] = res.user.email;
        user['uid'] = res.user.uid;
        this.getUser(user);
        loading.dismiss();
      }, (error) => {
        loading.dismiss();
        console.log(error);
        this.presentAlert();
      });
    }
    
    getUser(user) {
      this.getUserSubscription = 
      this.authService.getUser(this.loginForm.get('email').value).subscribe(data => {
        let person = {};
        person = data.map(e => {
          return {
            name: e.payload.doc.data()['name'],
            role: e.payload.doc.data()['role'],
          };
        });
        user['name'] = person[0].name;
        user['role'] = person[0].role;
        console.log(user);
        this.storage.set('userAuth', user);
        this.router.navigate(['/home']);
      }, (error) => {
        this.presentAlert();
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Subtitle',
      message: '¡El correo o la contraseña son incorrectos!',
      buttons: ['Entendido']
    });

    await alert.present();
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

}