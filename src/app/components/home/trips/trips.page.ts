import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  public trips: any = [];

  constructor(
    public tripsServices: TripsService, 
    public router: Router,
    private storage: Storage,
    ) { }

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
