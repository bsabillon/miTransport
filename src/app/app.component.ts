import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Conducir',
      url: 'drive',
      icon: 'navigate'
    },
    {
      title: 'Inicio',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Operaciones',
      url: 'operations',
      icon: 'car'
    },
    {
      title: 'Finanzas',
      url: 'finance',
      icon: 'wallet'
    },
    {
      title: 'Configuración',
      url: 'configuration',
      icon: 'settings'
    },
    {
      title: 'Ayuda',
      url: 'help',
      icon: 'help'
    }
  ];
 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  onLogOut(){
    console.log("logging out");
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
