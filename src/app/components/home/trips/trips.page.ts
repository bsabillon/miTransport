import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengersTripsService } from 'src/app/services/passengers-trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  public trips: any = [];

  constructor(public tripsServices: PassengersTripsService, public router: Router) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(){
    this.tripsServices.getTrips().subscribe(trips => {
      this.trips = trips;
      console.log(trips);
    });
  }

  


}
