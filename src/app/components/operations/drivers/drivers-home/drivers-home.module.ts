import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriversHomePageRoutingModule } from './drivers-home-routing.module';

import { DriversHomePage } from './drivers-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriversHomePageRoutingModule
  ],
  declarations: [DriversHomePage]
})
export class DriversHomePageModule {}
