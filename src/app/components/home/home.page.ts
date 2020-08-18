import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public page: string;
  latitude = 15.493231;
  longitude = -88.035140;
  constructor(
    private activatedRoute: ActivatedRoute,
    private launchNavigator: LaunchNavigator,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    ) { }

  ngOnInit() {
   // this.page = this.activatedRoute.snapshot.toString();
  }

  async howToArrive() {
    const loading = await this.loadingController.create({
    });
    await loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('latlong', this.latitude, this.longitude);
        const options: LaunchNavigatorOptions = {

          start: `${resp.coords.latitude}, ${resp.coords.longitude}`,
          app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.launchNavigator.navigate([this.latitude, this.longitude], options)
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     await loading.dismiss();
    // this.launchNavigator.navigate('San Pedro Sula');
  }

}
