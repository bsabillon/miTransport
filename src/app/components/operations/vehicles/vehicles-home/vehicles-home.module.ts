import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiclesHomePageRoutingModule } from './vehicles-home-routing.module';

import { VehiclesHomePage } from './vehicles-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiclesHomePageRoutingModule
  ],
  declarations: [VehiclesHomePage]
})
export class VehiclesHomePageModule {}
