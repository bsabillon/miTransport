import { Injectable } from '@angular/core';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMap,
  Marker,
  ILatLng,
} from '@ionic-native/google-maps';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsServiceService {
  @ViewChild('map', { static: true}) MapElement: ElementRef;
  public map: GoogleMap;
  public coords: any = {};
  public marker: Marker;
  // myPosition: any;
  private initialState:any;
  private FocusSubject = new BehaviorSubject(this.initialState);
  public FocusObservable = this.FocusSubject.asObservable();

  public deliveryPosition: ILatLng = {
    lat: 0,
    lng: 0
  };

  constructor(
    private geolocation: Geolocation
    // public http:HttpClient
  ) { }

  public async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    // console.log('current: ', rta);
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  doGeocode(marker: Marker) {
    console.log(marker.getPosition());
    const position = `Lat: ${marker.getPosition().lat}, Lng: ${marker.getPosition().lng}`;
    marker.setTitle(position);
    marker.showInfoWindow();
  }

  public setFocus(state:any){
    this.FocusSubject.next(state);
  }


}
