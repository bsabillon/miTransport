import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassengersHomePage } from './passengers-home.page';

const routes: Routes = [
  {
    path: '',
    component: PassengersHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengersHomePageRoutingModule {}
