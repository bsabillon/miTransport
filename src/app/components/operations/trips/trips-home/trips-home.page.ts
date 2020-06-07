import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import {Trip} from '../../../../models/trip.class';
import {TripsService} from '../../../../services/trips.service';


@Component({
  selector: 'app-trips-home',
  templateUrl: './trips-home.page.html',
  styleUrls: ['./trips-home.page.scss'],
})
export class TripsHomePage implements OnInit {
  public trips: any = [];

  constructor(public tripsServices: TripsService, public router: Router) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(){
    this.tripsServices.getTrips().subscribe(trips => {
      this.trips = trips;
     // console.log(vehicles);
    });
  }


}
