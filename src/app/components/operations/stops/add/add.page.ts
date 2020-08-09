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

  @ViewChild('map', { static: true }) MapElement: ElementRef;
  @ViewChild('buttonLocation', { static: true }) buttonLocation: ElementRef;
  @ViewChild('pinLocation', { static: true }) pinLocation: ElementRef;
  public map: GoogleMap;
  public coords: any = {};
  public marker: Marker;
  // myPosition: any;
  public deliveryPosition: ILatLng = {
    lat: 1,
    lng: 1
  };
  public suggestions: any = [];
  public markers: any = [];
  public setPositionAddressLat: number;
  public setPositionAddressLng: number;
  safeHtml: SafeHtml;


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
        coordinates: new FormControl('', Validators.compose([
          Validators.required,
        ])),
      });
  
    }
  
    ngOnInit() {
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
      record['coordinates'] = this.addForm.get('coordinates').value;
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

  onClick(){
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(`<img src="https://static.wixstatic.com/media/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png/v1/fill/w_320,h_320,fp_0.50_0.50/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png" id="centerMarkerImg" #pinLocation>`);
    const text = this.renderer.createText("my button");
    this.renderer.appendChild(this.MapElement.nativeElement, text);
  }

  createPin(){
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(`<img src="https://static.wixstatic.com/media/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png/v1/fill/w_320,h_320,fp_0.50_0.50/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png" id="centerMarkerImg" #pinLocation>`);
  }

  async loadMap() {
    console.log(`1`);
    const loading = await this.loadingCtrl.create({
      message: 'Por favor espere...',
      cssClass:'Hidden'
    });
    loading.present();
    LocationService.getMyLocation({ enableHighAccuracy: true }).then(position => {
      loading.dismiss();
      this.deliveryPosition = position.latLng;
      this.addForm.patchValue({
        coordinates: this.deliveryPosition,
      });
      // console.log(position);
      const mapOptions: GoogleMapOptions = {
        camera: {
          target: this.deliveryPosition,
          zoom: 17,
        },
        controls: {
          zoom: false,
        },
        draggable: true,
      };
      this.map = GoogleMaps.create(this.MapElement.nativeElement, mapOptions);

      this.youAreHere();
      // this.placesService = new google.maps.places.PlacesService(this.MapElement.nativeElement);
      this.createPin();
      this.getPosition();
    }, (error) => {
      loading.dismiss();
      this.router.navigate(['/']);
      // this.router.navigate(['/tabs/home']);
      console.log(`No tienes permisos!`);
      console.log(error);
    });
  }

  async youAreHere(){
    // try{this.marker.remove()}catch(error){}
    this.marker = this.map.addMarkerSync({
      title: '¡Tu estas aqui!',
      icon: {
        url: 'https://static.wixstatic.com/media/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png/v1/fill/w_320,h_320,fp_0.50_0.50/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png',
        size: {
          width: 36,
          height: 36
        }
      },
      position: this.deliveryPosition
    });
  }

  getPosition() {
    console.log('Map is ready!');

    // this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe((result) => {
    //   console.log('clicked');
    // });

    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe(value => {
      // console.log('object :', value);
      const position = value[0].target;

      this.deliveryPosition.lat = position.lat;
      this.deliveryPosition.lng = position.lng;
      this.setPositionAddressLat = this.deliveryPosition.lat;
      this.setPositionAddressLng = this.deliveryPosition.lng;
      this.addForm.patchValue({
        coordinates: this.deliveryPosition,
      });
      console.log(this.marker);
      // try{this.marker.remove()}catch(error){}
      // this.youAreHere();
      console.log("target", value[0].target);
      console.log("deliveryPosition", this.deliveryPosition);
      console.log("setPositionAddressLat", this.setPositionAddressLat);
      console.log("setPositionAddressLng", this.setPositionAddressLng);

    });

  }

  public async myPosition() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor espere...',
      cssClass:'Hidden'
    });
    loading.present();
    const myLatLng = await this.googlemapsService.getLocation();
    this.map.setCameraTarget(myLatLng);
    this.marker.setPosition(myLatLng);
    this.deliveryPosition = myLatLng;
    this.addForm.patchValue({
      coordinates: this.deliveryPosition,
    });
    this.map.setCameraZoom(17);
    loading.dismiss();
  }

  doGeocode(marker: Marker) {
    // console.log(marker.getPosition());
    const position = `Lat: ${marker.getPosition().lat}, Lng: ${marker.getPosition().lng}`;
    marker.setTitle(position);
    marker.showInfoWindow();
  }

  moveToLocation(position:ILatLng) {
    this.deliveryPosition = position;
    const moveTo: ILatLng = position;
    this.map.setOptions({
      camera: {
        target: moveTo,
        zoom: 16,
      },
    });
  }

}
