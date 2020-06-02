import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriversHomePage } from './drivers-home.page';

const routes: Routes = [
  {
    path: '',
    component: DriversHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversHomePageRoutingModule {}
