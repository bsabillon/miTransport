import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StopsHomePageRoutingModule } from './stops-home-routing.module';

import { StopsHomePage } from './stops-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StopsHomePageRoutingModule
  ],
  declarations: [StopsHomePage]
})
export class StopsHomePageModule {}
