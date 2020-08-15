import { LoadingController, ModalController, Platform, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder,
  GeocoderResult,
  GeocoderRequest,
  Marker,
  ILatLng,
  BaseArrayClass,
  Environment,
  LocationService,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Subscription, from } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {StopsService} from '../../../../services/stops.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { GooglemapsServiceService } from 'src/app/services/googlemapsService/googlemaps-service.service';

declare var google: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addForm: FormGroup;

  validation_messages = {
    alias: [
      { type: 'required', message: 'El alias es requerido.' },
    ],
    coordinates: [
      { type: 'required', message: 'Las coordenadas son requeridas.' },
    ]
  };

  @ViewChild('map', { static: true}) MapElement: ElementRef;
  public map: GoogleMap;
  public coords: any = {};
  public marker: Marker;
  // myPosition: any;
  public deliveryPosition: ILatLng = {
    lat: 0,
    lng: 0
  };
  public setPositionAddressLat: number;
  public setPositionAddressLng: number;

  constructor(
    public stopsService: StopsService,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private googleMaps: GoogleMaps,
    private geocoder: Geocoder,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    protected googlemapsService: GooglemapsServiceService,
    public platform: Platform,
    public navCtrl: NavController,
    public zone: NgZone,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    ) {
      this.addForm = this.formBuilder.group({
        alias: new FormControl('', Validators.compose([
          Validators.required,
        ])),
      });
  
    }
  
    ngOnDestroy() {
      this.loadingCtrl.dismiss();
    }
  
    ionViewDidEnter(){
      this.verifyEnabledLocation();
    }

  async addStop() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
    });
    loading.present();
    this.storage.get('userAuth').then((data) => {
      const record = {};
      record['alias'] = this.addForm.get('alias').value;
      record['coordinates'] = `${this.deliveryPosition.lat}-${this.deliveryPosition.lng}`;
      record['userUid'] = data.uid;
      this.stopsService.addStop(record).then((stop) => {
        console.log(stop);
        this.presentToast('¡La parada se agregó correctamente!');
        this.addForm.reset();
        loading.dismiss();
      }, (error) => {
        console.log(error);
        this.presentToast('¡La parada no se pudo agregar!');
        loading.dismiss();
      });
    });
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2100
    });
    toast.present();
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
    console.log(`2`);
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      // if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            console.log('Request successful');
            this.loadMap();
          },
          error => {
            this.router.navigate(['/']);
            console.log('Error requesting location permissions', error);
          }
        );
      // }
    });
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
     loading.present();
    //  Environment.setEnv({
    //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDWQpOjFLG5q1LIfqAdWpEVCnjQXkdR1ro',
    //   'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDWQpOjFLG5q1LIfqAdWpEVCnjQXkdR1ro'
    // });
    const myLatLng = await this.googlemapsService.getLocation();
    this.deliveryPosition = myLatLng;
  //  const mapEle: HTMLElement = document.getElementById('map');
    this.map = GoogleMaps.create('map', {
      camera: {
        target: {
          lat: myLatLng.lat,
          lng: myLatLng.lng
        },
      zoom: 17,
      },
      controls: {
        zoom: false,
      },
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      loading.dismiss();
      this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe(res => {
        // console.log(this.map.getCameraTarget());
        const position = this.map.getCameraTarget();
        this.deliveryPosition.lat = position.lat;
        this.deliveryPosition.lng = position.lng;
        this.setPositionAddressLat = this.deliveryPosition.lat;
        this.setPositionAddressLng = this.deliveryPosition.lng;
        });
    });

    this.marker = this.map.addMarkerSync({
      title: 'Ubication',
      icon: {
          url : '../../../../../assets/img/marker.png',
          size: {
            width: 26,
            height: 26
          }
      },
      position: {
        lat: myLatLng.lat,
        lng: myLatLng.lng
      }
    });
  }

  public async myPosition() {
    const loading = await this.loadingCtrl.create();
     loading.present();
    const myLatLng = await this.googlemapsService.getLocation();
    this.map.setCameraTarget(myLatLng);
    this.marker.setPosition(myLatLng);
    this.deliveryPosition = myLatLng;
    this.map.setCameraZoom(17);
    loading.dismiss();
  }

  doGeocode(marker: Marker) {
    // console.log(marker.getPosition());
    const position = `Lat: ${marker.getPosition().lat}, Lng: ${marker.getPosition().lng}`;
    marker.setTitle(position);
    marker.showInfoWindow();
  }

}
