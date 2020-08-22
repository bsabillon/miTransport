import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


import { TripsService } from '../../../../services/trips.service';
import { VehiclesService } from '../../../../services/vehicles.service';
import { DriversService } from '../../../../services/drivers.service';
import { PassengersService } from '../../../../services/passengers.service';
import { AuthService } from 'src/app/services/auth.service';

import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { StopsService } from 'src/app/services/stops.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  providers: [VehiclesService]
})
export class AddPage implements OnInit {
  addForm: FormGroup;

  validation_messages = {
    recurrency: [
      { type: 'required', message: 'La recurrencia del viaje es requerida.' },
    ],
    time: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ],
    origin: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ],
    destination: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ],
    stops: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ],
    driver: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ],
    passengers: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ],
    vehicle: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ],
  };

  constructor(
    public stopsServices: StopsService,
    public tripsServices: TripsService, 
    public vehiclesServices: VehiclesService,
    public driversServices: DriversService,
    public passengersServices: PassengersService,
    public authService: AuthService,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder
  ) { 
    this.addForm = this.formBuilder.group({
      recurrency: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      time: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      origin: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      destination: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      stops: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      driver: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      passengers: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      vehicle: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  public vehicles: any = [];
  public drivers: any[];
  public passengers: any[];
  public trips: any = [];
  public stops: any = [];

  ngOnInit() {
    this.getVehicules();
    this.getDrivers();
    this.getPassengers();
    this.getStops();

  }

  async addTrip() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    this.storage.get('userAuth').then((data) => {
      const record = {};
      record['recurrency'] = this.addForm.get('recurrency').value;
      record['time'] = this.addForm.get('time').value;
      record['origin'] = this.addForm.get('origin').value;
      record['destination'] = this.addForm.get('destination').value;
      record['stops'] = this.addForm.get('stops').value;
      record['driver'] = this.addForm.get('driver').value;
      record['passengers'] = this.addForm.get('passengers').value;
      record['vehicle'] = this.addForm.get('vehicle').value;
      record['userUid'] = data.uid;
      this.tripsServices.addTrip(record).then((trip) => {
        console.log(trip);
        this.presentToast('¡El viaje se agregó correctamente!');
        this.addForm.reset();
        loading.dismiss();
      }, (error) => {
        console.log(error);
        this.presentToast('¡El viaje no se pudo agregar!');
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

  getVehicules() {
    this.vehiclesServices.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  };

  getDrivers() {
    this.driversServices.getDrivers().subscribe(drivers => {
      this.drivers = drivers;
    });
  };

  getPassengers() {
    this.passengersServices.getUsers().subscribe(passengers => {
      this.passengers = passengers;
    });
  }

  getStops() {
    this.stopsServices.getStops().subscribe(stops => {
      this.stops = stops;
    });
  }

  transformDate() {
    const date = new Date(this.addForm.get('time').value);
    var datePipe = new DatePipe('es-HN');
    const fullDate = datePipe.transform(date, 'hh:mm a');
    // console.log(fullDate);
    this.addForm.controls.time.setValue(`${fullDate}`);

    // const splitDate = date.split('T');
    // const time = splitDate[1];
    // const splitTime = time.split('.');
    // const finalTime = splitTime[0];
  }


}
