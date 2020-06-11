import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StopsHomePage } from './stops-home.page';

const routes: Routes = [
  {
    path: '',
    component: StopsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopsHomePageRoutingModule {}
