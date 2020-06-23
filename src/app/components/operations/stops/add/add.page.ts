import { Component, OnInit } from '@angular/core';
import {StopsService} from '../../../../services/stops.service';
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
    alias: [
      { type: 'required', message: 'El alias es requerido.' },
    ],
    coordinates: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ]
  };
  constructor(
    public stopsService: StopsService,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder) {
      this.addForm = this.formBuilder.group({
        alias: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        coordinates: new FormControl('', Validators.compose([
          Validators.required,
        ])),
      });}

  ngOnInit() {
  }

  async addStop() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    this.storage.get('userAuth').then((data) => {
      const record = {};
      record['alias'] = this.addForm.get('alias').value;
      record['coordinates'] = this.addForm.get('coordinates').value;
      record['userUid'] = data.uid;
      this.stopsService.addStop(record).then((stop) => {
        console.log(stop);
        this.presentToast('¡La parada se agregó correctamente!');
        this.addForm.reset();
        loading.dismiss();
      }, (error) => {
        console.log(error);
        this.presentToast('¡La parada no se pudo agregar!');
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
