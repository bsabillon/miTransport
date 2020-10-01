import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpAdminPageRoutingModule } from './help-admin-routing.module';

import { HelpAdminPage } from './help-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HelpAdminPageRoutingModule
  ],
  declarations: [HelpAdminPage]
})
export class HelpAdminPageModule {}
