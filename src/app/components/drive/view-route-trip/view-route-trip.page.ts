import { Component, OnInit } from '@angular/core';
import { LocationService } from '@ionic-native/google-maps';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LoadingController, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}

@Component({
  selector: 'app-view-route-trip',
  templateUrl: './view-route-trip.page.html',
  styleUrls: ['./view-route-trip.page.scss'],
})
export class ViewRouteTripPage implements OnInit {
  public folder: string;
  map: any;
  orderStatus: string;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // parque simon bolivar
  origin = { lat: 15.477133, lng: -88.016935 };
  // Parque la 93
  destination = { lat: 15.485984, lng: -87.97597671317506 };

  markers: Marker[] = [
    {
      position: {
        lat: 15.477133, lng: -88.016935
      },
      title: 'Parque Simón Bolivar'
    },
    {
      position: {
        lat: 15.494018052770185, lng: -87.97597671317506
      },
      title: 'Jardín Botánico'
    },
  ];

  wayPoints: WayPoint[] = [
    {
      location: { lat: 15.553716049190445, lng: -88.0201752223267 }, // Jardín Botánico
      stopover: true,
    },
    {
      location: { lat: 15.559917520117661, lng: -87.98326802628178 }, // Parque la 93
      stopover: true,
    },
    {
      location: { lat: 15.56537465993454, lng:  -87.95743298905033}, // Maloka
      stopover: true,
    },
  ];

  constructor(
    private router: Router,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private diagnostic: Diagnostic,
    public storage: Storage,
    private modalCtrl: ModalController,
    private locationAccuracy: LocationAccuracy,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    // this.loadMap();
    this.loadMap();
  }

  verifyEnabledLocation() {
    this.diagnostic.isLocationEnabled().then(success => {
      console.log('verificando isLocationEnabled ', success);
      (success) ? this.loadMap() : this.requestEnabledLocation();
    }, error => {
      console.log('error', error);
    });
  }

  requestEnabledLocation() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            console.log('Request successful');
            this.loadMap();
          },
          error => {
            this.router.navigate(['/home']);
            console.log('Error requesting location permissions', error);
          }
        );
      }
    });
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.origin.lat = resp.coords.latitude;
      this.origin.lng = resp.coords.longitude;
      console.log(this.origin);
      // create a new map by passing HTMLElement
      const mapEle: HTMLElement = document.getElementById('map');
      const indicatorsEle: HTMLElement = document.getElementById('indicators');
      // create LatLng object
      // const myLatLng = {lat: 15.477133, lng: -88.016935};
      // create map
      this.map = new google.maps.Map(mapEle, {
        center: this.origin,
        zoomControl: false,
        rotateControl: true,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12
      });

      this.directionsDisplay.setPanel(indicatorsEle);
      this.directionsDisplay.setMap(this.map);

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // this.renderMarkers();
      // const marker = {
      //     position: {
      //         lat: this.origin.lat,
      //         lng: this.origin.lng
      //     },
      //     title: 'Origen'
      // };
      // this.addMarker(marker);
      mapEle.classList.add('show-map');
          // this.renderMarkers();
      this.calculateRoute(this.origin);
    });
  });
  }

  private calculateRoute(currentLocation) {
    console.log(`D: ${this.destination.lng}`);
    this.directionsService.route({
      origin: currentLocation,
      destination: this.destination,
      waypoints: this.wayPoints,
      // optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}