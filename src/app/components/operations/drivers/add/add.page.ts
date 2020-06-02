import { Component, OnInit } from '@angular/core';
import {DriversService} from '../../../../services/drivers.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(public driversService: DriversService) { }

  ngOnInit() {
  }

  addDriver(formDriver: NgForm):void{
    if(formDriver.value.id == null){
      this.driversService.addVehicle(formDriver.value);
    }else{
      this.driversService.updateVehicle(formDriver.value);
    }
    formDriver.reset();
  }



}
