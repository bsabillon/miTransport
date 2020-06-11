import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Stop} from '../../../../models/stop.class';
import {StopsService} from '../../../../services/stops.service';


@Component({
  selector: 'app-stops-home',
  templateUrl: './stops-home.page.html',
  styleUrls: ['./stops-home.page.scss'],
})
export class StopsHomePage implements OnInit {
  public stops: any = [];

  constructor(public stopsServices: StopsService, public router: Router) { }

  ngOnInit() {
    this.getStops();
  }

  getStops(){
    this.stopsServices.getStops().subscribe(stops => {
      this.stops = stops;
    });
  }

  deleteStop(stopId: string){
    const confirmacion = confirm('Esta seguro de eliminar?');
    if(confirmacion){
      this.stopsServices.deleteStop(stopId);
    }
    
  }


}
