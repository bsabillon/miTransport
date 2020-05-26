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
    loadChildren: () => import('./components/operations/operations.module').then( m => m.OperationsPageModule),
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
