import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../../../services/vehicles.service';
import { Router } from '@angular/router';
import {Vehicle} from '../../../../models/vehicle.class';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AddPage } from '../../vehicles/add/add.page';




@Component({
  selector: 'app-vehicles-home',
  templateUrl: './vehicles-home.page.html',
  styleUrls: ['./vehicles-home.page.scss'],
})
export class VehiclesHomePage implements OnInit {
public vehicles: any = [];
public getVehiclesSubscription: Subscription;
  constructor(
    public vehiclesServices: VehiclesService, 
    public router: Router, 
    public authService: AuthService,
    public modalCtrl: ModalController, 
    public loadingController: LoadingController,
    public toastController: ToastController, 
  ) 
  { }

  ionViewWillEnter() {
    this.authService.isWsAvailable.next(true);
    this.getVehicules();
  }

  ionViewDidLeave() {
    ((this.getVehiclesSubscription) !== undefined ? this.getVehiclesSubscription.unsubscribe() : '');
  }

  ngOnInit() {
  
  }

  getVehicules(){
    this.vehiclesServices.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  }

  deleteVehicle(vehicleId: string){
    const confirmacion = confirm('Esta seguro de eliminar?');
    if(confirmacion){
      this.vehiclesServices.deleteVehicle(vehicleId);
    }
  }

  async openAddVehicleModal() {
    const presentModal = await this.modalCtrl.create({
      component: AddPage,
      componentProps: {
        'isModal': true,
      },
      mode: 'ios',
      cssClass: 'modal_Content_MM'
    });

    return await presentModal.present();
  }

  async updateVehicle(vehicle) {
    const presentModal = await this.modalCtrl.create({
      component: AddPage,
      componentProps: {
        'isModal': true,
        'vehicle': vehicle,
      },
      mode: 'ios',
      cssClass: 'modal_Content_MM'
    });

    return await presentModal.present();
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }


}
