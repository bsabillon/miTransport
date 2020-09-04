import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../../../services/vehicles.service';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addForm: FormGroup;
  public vehicle: any = {};

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
    private navParams: NavParams,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modalCrtl: ModalController,
    public formBuilder: FormBuilder,
    ) {
      this.vehicle = this.navParams.get('vehicle');
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

  ionViewWillEnter() {
    this.verifyIfVehicleComing();
  }

ionViewDidLeave(){

}

  verifyIfVehicleComing() {
    if (this.vehicle !== undefined) {
      console.log(this.vehicle);
      this.addForm.patchValue({
        alias: this.vehicle.alias,
        capacity: this.vehicle.capacity,
        licensePlate: this.vehicle.licensePlate,
        companyId: this.vehicle.companyId,
      });
    }
  }

  setVehicle() {
    if (this.vehicle === undefined) {
      this.addVehicle();
    } else {
      this.updateVehicle();
    }
  }

  async addVehicle() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    this.storage.get('userAuth').then((data) => {
      const record = {};
      record['alias'] = this.addForm.get('alias').value;
      record['capacity'] = this.addForm.get('capacity').value;
      record['licensePlate'] = this.addForm.get('licensePlate').value;
      record['companyId'] = data.companyId;
      this.vehiclesService.addVehicle(record).then((vehicle) => {
        console.log(vehicle);
        this.presentToast('¡El vehículo se agregó correctamente!');
        this.addForm.reset();
        loading.dismiss();
        this.modalCrtl.dismiss();
      }, (error) => {
        console.log(error);
        loading.dismiss();
        this.presentToast('¡El vehículo no se pudo agregar!');
        
      });
    });
  }

  async updateVehicle() {
    console.log(this.addForm.value);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    const record = {};
    record['alias'] = this.addForm.get('alias').value;
    record['capacity'] = this.addForm.get('capacity').value;
    record['licensePlate'] = this.addForm.get('licensePlate').value;
    this.vehiclesService.updateVehicle(this.vehicle.id, record).then((data) => {
      loading.dismiss();
      this.modalCrtl.dismiss();
    }).catch((error) => {
      console.log(error);
      loading.dismiss();
      this.presentToast('No se pudo actualizar el vehiculo.');
    });
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2100
    });
    toast.present();
  }


  swipeEvent(e) {
    console.log(e);
    if (e.direction === 16) {
      this.modalCrtl.dismiss();
    }
  }

}
