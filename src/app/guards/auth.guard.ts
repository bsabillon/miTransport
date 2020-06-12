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
 

  constructor(
    private authService: AuthService, 
    private router: Router,
    public afAuth: AngularFireAuth,
    ) {

  }

  async canActivate(): Promise<boolean> {
    if(await this.authService.isLogged()==true){
      console.log('guardia si');
      return true;
    }
    console.log('guardia no');
    return false;
  }

  /*
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // No borrar authLogged (Importante)!
      let authLogged = this.authService.isLogged();
     // console.log(authLogged);
      if (this.authService.isLogged()) {
       // this.router.navigateByUrl('/login');
       console.log("guardia si");
        return true;
      } else {
        console.log("guardia no");
        console.log("Acceso denegado");
        return false;
      }
  }*/
  
}
