import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRouteTripPage } from './view-route-trip.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRouteTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRouteTripPageRoutingModule {}
