import { Component, OnInit } from '@angular/core';
import {DriversService} from '../../../../services/drivers.service';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addForm: FormGroup;
  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es requerido.' },
    ],
    email: [
      { type: 'required', message: 'El email es requerido.' },
    ]
  };
  constructor(
    public driversService: DriversService,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    ) { 
      this.addForm = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
        ]))
      });
    }

  ngOnInit() {
  }

  async addDriver() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    this.storage.get('userAuth').then((data) => {
      const record = {};
      record['name'] = this.addForm.get('name').value;
      record['email'] = this.addForm.get('email').value;
      record['userUid'] = data.uid;
      this.driversService.addDriver(record).then((driver) => {
        console.log(driver);
        this.presentToast('¡El conductor se agregó correctamente!');
        this.addForm.reset();
        loading.dismiss();
      }, (error) => {
        console.log(error);
        this.presentToast('¡El conductor no se pudo agregar!');
        loading.dismiss();
      });
    });
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2100
    });
    toast.present();
  }
}
