import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import {TripsService} from '../../../../services/trips.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(public tripsServices: TripsService) { }

  ngOnInit() {
  }

  addTrip(formTrip: NgForm):void{
    if(formTrip.value.id == null){
      this.tripsServices.addTrip(formTrip.value);
    }else{
      this.tripsServices.updateTrip(formTrip.value);
    }
    formTrip.reset();
  }


}
