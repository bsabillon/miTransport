import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Passenger} from '../../../../models/passenger.class';
import {PassengersService} from '../../../../services/passengers.service';



@Component({
  selector: 'app-passengers-home',
  templateUrl: './passengers-home.page.html',
  styleUrls: ['./passengers-home.page.scss'],
})
export class PassengersHomePage implements OnInit {
  public users: any = [];
  constructor(public userServices: PassengersService, public router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userServices.getUsers().subscribe(users => {
      this.users = users;
    });
  }




}
