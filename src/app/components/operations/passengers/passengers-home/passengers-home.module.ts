import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengersHomePageRoutingModule } from './passengers-home-routing.module';

import { PassengersHomePage } from './passengers-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassengersHomePageRoutingModule
  ],
  declarations: [PassengersHomePage]
})
export class PassengersHomePageModule {}
