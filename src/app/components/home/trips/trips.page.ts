import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TripsService} from '../../../services/trips.service';
import {Trip} from '../../../models/trip.class';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  public trips: any = [];

  constructor(public tripsServices: TripsService, public router: Router) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(){
    this.tripsServices.getTrips().subscribe(trips => {
      this.trips = trips;
     // console.log(trips);
    });
  }

  


}
