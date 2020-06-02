import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLogged = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    public afAuth: AngularFireAuth,
    ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // No borrar authLogged (Importante)!
      let authLogged = this.authService.isLogged();
      if (!this.authService.isLogged()) {
        this.router.navigateByUrl('/login');
        console.log("Acceso denegado");
        return false;
      } else {
        return true;
      }
  }
  
}
