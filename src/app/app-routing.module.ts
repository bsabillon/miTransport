import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'operations',
    loadChildren: () => import('./components/operations/operationsHome/operations.module').then( m => m.OperationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('./components/help/help.module').then( m => m.HelpPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'drive',
    loadChildren: () => import('./components/drive/drive.module').then( m => m.DrivePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'finance',
    loadChildren: () => import('./components/finance/finance.module').then( m => m.FinancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'configuration',
    loadChildren: () => import('./components/configuration/configuration.module').then( m => m.ConfigurationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'vehicles-home',
    loadChildren: () => import('./components/operations/vehicles/vehicles-home/vehicles-home.module').then( m => m.VehiclesHomePageModule)
  },
  {
    path: 'vehicles/add',
    loadChildren: () => import('./components/operations/vehicles/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'drivers-home',
    loadChildren: () => import('./components/operations/drivers/drivers-home/drivers-home.module').then( m => m.DriversHomePageModule)
  },
  {
    path: 'drivers/add',
    loadChildren: () => import('./components/operations/drivers/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'trips-home',
    loadChildren: () => import('./components/operations/trips/trips-home/trips-home.module').then( m => m.TripsHomePageModule)
  },
  {
    path: 'trips/add',
    loadChildren: () => import('./components/operations/trips/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'passengers-home',
    loadChildren: () => import('./components/operations/passengers/passengers-home/passengers-home.module').then( m => m.PassengersHomePageModule)
  },
  {
    path: 'passengers/add',
    loadChildren: () => import('./components/operations/passengers/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'stops-home',
    loadChildren: () => import('./components/operations/stops/stops-home/stops-home.module').then( m => m.StopsHomePageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./components/operations/stops/add/add.module').then( m => m.AddPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
