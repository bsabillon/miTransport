import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import {PassengersService} from '../../../../services/passengers.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(public passengersServices: PassengersService) { }

  ngOnInit() {
  }

  addPassenger(formPassenger: NgForm):void{
    if(formPassenger.value.id == null){
      this.passengersServices.addPassenger(formPassenger.value);
    }else{
      this.passengersServices.updatePassenger(formPassenger.value);
    }
    formPassenger.reset();
  }


}
