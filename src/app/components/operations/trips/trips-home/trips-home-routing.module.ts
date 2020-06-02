import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsHomePage } from './trips-home.page';

const routes: Routes = [
  {
    path: '',
    component: TripsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsHomePageRoutingModule {}
