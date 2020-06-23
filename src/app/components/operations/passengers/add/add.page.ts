import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {Storage} from '@ionic/storage';


import {PassengersService} from '../../../../services/passengers.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public currentUserId: string;

  constructor(public passengersServices: PassengersService, public storage: Storage) { }

  ngOnInit() {
    this.getCurrentUser();
    console.log(this.currentUserId);
  }

  addPassenger(formPassenger: NgForm):void{
    if(formPassenger.value.id == null){
      this.passengersServices.addUserr(formPassenger.value);
    }else{
      this.passengersServices.updateUser(formPassenger.value);
    }
    formPassenger.reset();
  }

  getCurrentUser(){
    this.storage.get('userAuth').then((data) => {
      //console.log(data);
      if (data) {
       return this.currentUserId = data.uid;
      } else {
       return this.currentUserId = null;
      }
    });
  }

}
