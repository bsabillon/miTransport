import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {
  user: any = {};

  constructor(private storage: Storage,
    public alertController: AlertController,
    private authService: AuthService,
    private iab: InAppBrowser,
    private clipboard: Clipboard,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUser();
  }

  privacyPolicies() {
    const browser = this.iab.create('https://ionicframework.com/');

    // browser.executeScript(...);

    // browser.insertCSS(...);
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });

    browser.close();
  }

  copyIdCompany() {
    this.storage.get('userAuth').then((data) => {
      this.user = data;
      console.log(this.user);
      this.clipboard.copy(this.user.companyId).then((result) => {
        console.log(result);
        this.presentToast('¡Copiado al portapapeles!');
      });
    });
  }

  getUser() {
    this.storage.get('userAuth').then((data) => {
      this.user = data;
      console.log(this.user);
    });
  }

  async editName() {
    const alert = await this.alertController.create({
      message: '¿Estas seguro que deseas cambiar tu nombre?',
      mode: 'ios',
      inputs: [{
        name: 'name',
        type: 'text',
        placeholder: `${this.user.name}`
      }],
      buttons: [{ text: 'Cancelar', role: 'cancel' }, {
        text: 'Cambiar', handler: (data) => {
          if (data.name === '' || data.name === null) {
            console.log(data.name)
          } else {
            this.updateUserName(data.name);
          }
        }
      }]
    });
    await alert.present();
  }

  updateUserName(newName) {
    this.authService.updateUserName(newName, this.user.uid).then(() => {
      const user = this.user;
      user['name'] = newName;
      this.storage.set('userAuth', user).then(() => {
        this.getUser();
      });
    });
  }

  async editPhone() {
    const alert = await this.alertController.create({
      message: '¿Estas seguro que deseas cambiar tu celular?',
      mode: 'ios',
      inputs: [{
        name: 'phone',
        type: 'text',
        placeholder: `${this.user.phone}`
      }],
      buttons: [{ text: 'Cancelar', role: 'cancel' }, {
        text: 'Cambiar', handler: (data) => {
          if (data.phone === '' || data.phone === null) {
            console.log(data.phone)
          } else {
            this.updateUserPhone(data.phone);
          }
        }
      }]
    });
    await alert.present();
  }

  updateUserPhone(newPhone) {
    this.authService.updateUserPhone(newPhone, this.user.uid).then(() => {
      const user = this.user;
      user['phone'] = newPhone;
      this.storage.set('userAuth', user).then(() => {
        this.getUser();
      });
    });
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

}
