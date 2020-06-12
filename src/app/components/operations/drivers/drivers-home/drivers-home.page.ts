import { Component, OnInit } from '@angular/core';
import {DriversService} from '../../../../services/drivers.service';
import { Router } from '@angular/router';
import {Driver} from '../../../../models/driver.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-drivers-home',
  templateUrl: './drivers-home.page.html',
  styleUrls: ['./drivers-home.page.scss'],
})
export class DriversHomePage implements OnInit {
  public drivers: any = [];

  constructor(public driversServices: DriversService, public router: Router) { }

  ngOnInit() {
    this.getDrivers();
  }


  getDrivers(){
    this.driversServices.getDrivers().subscribe(drivers => {
      this.drivers = drivers;
    });
  }

  deleteDriver(driverId: string){
    const confirmacion = confirm('Esta seguro de eliminar?');
    if(confirmacion){
      this.driversServices.deleteVehicle(driverId);
    }
    
  }


}
