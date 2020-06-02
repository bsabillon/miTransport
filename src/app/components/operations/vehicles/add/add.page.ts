import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../../../services/vehicles.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(public vehiclesService: VehiclesService) { }

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

}
