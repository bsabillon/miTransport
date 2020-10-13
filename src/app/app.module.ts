import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';


import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { GooglemapsServiceService } from './services/googlemapsService/googlemaps-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import localeESHN from '@angular/common/locales/es-HN';
import { registerLocaleData } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

registerLocaleData(localeESHN, 'es-HN');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    IonicStorageModule.forRoot({
      name: 'io.ionic.mitransporte',
      driverOrder: ['indexeddb', 'sqlite', 'websql',
    ]}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,AngularFireAuthModule,AngularFireDatabaseModule
  ],
  providers: [AngularFirestore,AngularFireAuth,
    StatusBar,
    GoogleMaps,
    Diagnostic,
    InAppBrowser,
    Geolocation,
    LocationAccuracy,
    GooglemapsServiceService,
    Geocoder,
    Clipboard,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
