import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  userInfo: any = [];
  public isAdmin: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  onLogOut() {
    //this.authService.onLogOut();
    this.authService.isWsAvailable.next(false);
    this.storage.clear();
    this.router.navigate(['/login'])

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    // this.authService.isLogged();
    // this.authService.isAdmin();
    // this.getUser();
    this.authService.isWsAvailable.subscribe((value) => {
      if (true == value) {
        console.log('true/v');
        this.getUser();
      } else {
        console.log('false/f');
        this.userInfo = null;
      }
    })

  }

  ionViewWillEnter() {
    this.getUser();
    console.log("view entered");
  }

  getUser() {
    this.storage.get('userAuth').then((data) => {
      console.log(data);
      if (data) {
        this.userInfo = data;
        if (data.role == "admin") {
          this.isAdmin = true;
          console.log(data.name + " is admin");
        } else {
          this.isAdmin = false;
          console.log(data.name + " is passenger");
        }
      } else {
        this.userInfo = null;
        this.isAdmin = false;
        console.log(data.name + " is not admin");
      }
    });
  }
}
