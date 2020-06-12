import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 
  constructor(
    private authService: AuthService, 
    private router: Router,
    public afAuth: AngularFireAuth,
    ) {
  }

  async canActivate(): Promise<boolean> {
    if(await this.authService.isAdmin()==true){
      console.log('admin guardia si');
      return true;
    }
    console.log('admin guardia no');
    return false;
  }

  
}
