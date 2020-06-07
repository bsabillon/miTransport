import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../../../services/vehicles.service';
import { Router } from '@angular/router';
import {Vehicle} from '../../../../models/vehicle.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-vehicles-home',
  templateUrl: './vehicles-home.page.html',
  styleUrls: ['./vehicles-home.page.scss'],
})
export class VehiclesHomePage implements OnInit {
public vehicles: any = [];

  constructor(public vehiclesServices: VehiclesService, public router: Router) { }

  ngOnInit() {
    this.getVehicules();
  }

  getVehicules(){
    this.vehiclesServices.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
     // console.log(vehicles);
    });
  }

  deleteVehicle(vehicleId: string){
    const confirmacion = confirm('Esta seguro de eliminar?');
    if(confirmacion){
      this.vehiclesServices.deleteVehicle(vehicleId);
    }
    
  }


}
