import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripsHomePageRoutingModule } from './trips-home-routing.module';

import { TripsHomePage } from './trips-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripsHomePageRoutingModule
  ],
  declarations: [TripsHomePage]
})
export class TripsHomePageModule {}
