import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRouteTripPageRoutingModule } from './view-route-trip-routing.module';

import { ViewRouteTripPage } from './view-route-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRouteTripPageRoutingModule
  ],
  declarations: [ViewRouteTripPage]
})
export class ViewRouteTripPageModule {}
