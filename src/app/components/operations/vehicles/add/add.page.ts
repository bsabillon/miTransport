import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../../../services/vehicles.service';
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
    capacity: [
      { type: 'required', message: 'La capacidad es requerida.' },
    ],
    licensePlate: [
      { type: 'required', message: 'La matrícula es requerida.' },
    ],
  };

  constructor(
    public vehiclesService: VehiclesService,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    ) {
      this.addForm = this.formBuilder.group({
        alias: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        capacity: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        licensePlate: new FormControl('', Validators.compose([
          Validators.required,
        ])),
      });
     }

  ngOnInit() {
  }

  addVehicle(formVehicle: NgForm):void{
    if(formVehicle.value.id == null){
      this.vehiclesService.addVehicle(formVehicle.value);
    }else{
      this.vehiclesService.updateVehicle(formVehicle.value);
    }
    formVehicle.reset();
  }

  async onRegister() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Porfavor espere...',
      // duration: 2000
    });
    loading.present();
    this.storage.get('userAuth').then((data) => {
      const record = {};
      record['alias'] = this.addForm.get('alias').value;
      record['capacity'] = this.addForm.get('capacity').value;
      record['licensePlate'] = this.addForm.get('licensePlate').value;
      record['userUid'] = data.uid;
      this.vehiclesService.addVehicle(record).then((vehicle) => {
        console.log(vehicle);
        this.presentToast('¡El vehículo se agregó correctamente!');
        this.addForm.reset();
        loading.dismiss();
      }, (error) => {
        console.log(error);
        this.presentToast('¡El vehículo no se pudo agregar!');
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
