import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import { TripsService } from '../../../../services/trips.service';
import { VehiclesService } from '../../../../services/vehicles.service';
import { DriversService } from '../../../../services/drivers.service';
import { PassengersService } from '../../../../services/passengers.service';
import { Vehicle } from 'src/app/models/vehicle.class';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  providers: [VehiclesService]
})
export class AddPage implements OnInit {

  constructor(public tripsServices: TripsService, public vehiclesServices: VehiclesService,
    public driversServices: DriversService,
    public passengersServices: PassengersService,
  ) { }
  public vehicles: any = [];
  public drivers: any[];
  public passengers: any[];
  public trips: any = [];

  ngOnInit() {
    this.getVehicules();
    this.getDrivers();
    this.getPassengers();

  }

  addTrip(formTrip: NgForm): void {
    if (formTrip.value.id == null) {
      this.tripsServices.addTrip(formTrip.value);
    } else {
      this.tripsServices.updateTrip(formTrip.value);
    }
    formTrip.reset();
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
    this.passengersServices.getPassengers().subscribe(passengers => {
      this.passengers = passengers;
    });
  }


}
