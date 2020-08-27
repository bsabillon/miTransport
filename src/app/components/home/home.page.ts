import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public page: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    public authService: AuthService,
    ) { }

  ngOnInit() {
   // this.page = this.activatedRoute.snapshot.toString();
  }

  ionViewWillEnter() {
    this.authService.isWsAvailable.next(true);
    this.menuCtrl.enable(true);

  }


}
