import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpAdminPage } from './help-admin.page';

const routes: Routes = [
  {
    path: '',
    component: HelpAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpAdminPageRoutingModule {}
