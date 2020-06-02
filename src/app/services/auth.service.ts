import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {

   }

async onLogin(user: User) {
  try{
    return await this.afAuth.signInWithEmailAndPassword(
        user.email, user.password);
  }
  catch(error){
    console.log('Error al iniciar sesion: ', error)
  }
}

async isLogged(): Promise<boolean> {
  let islog: boolean;
    await this.afAuth.authState.subscribe((user) => {
      console.log(user);
      if (user != null) {
        return islog = true;
      } else {
        return islog = false;
      }
    });
  return islog;
}

async onRegister (user: User){
  try{
    return await this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    )
  }catch(error){
    console.log('Error al registrar: ', error)
  }
}


}
