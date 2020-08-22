import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.page.html',
  styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {
  public trips: any = [];

  constructor(
    public tripsServices: TripsService, 
    public router: Router,

  ) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(){
    this.tripsServices.getTrips().subscribe(trips => {
      this.trips = trips;
    });


    
  }

}
