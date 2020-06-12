import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user.class';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isLog =false;
  constructor(public afAuth: AngularFireAuth, private router: Router,private afs: AngularFirestore) {

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

async onLogOut(){
  console.log("logging out");
  this.afAuth.signOut();
  this.router.navigateByUrl('/login');
}

async isLogged(): Promise<boolean> {
    await this.afAuth.authState.subscribe((user) => {
      console.log(user);
      if (user != null) {
        console.log('servicio si');
        return this.isLog = true;
      } else {
        console.log('servicio no');
        return this.isLog = false;
      }
    });
  return this.isLog;
}

async onRegister (user: User){
  try{
    return await new Promise ((resolve, reject)=>{
      this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(userData =>{
        resolve(userData),
        this.updateUserData(userData.user)
      })
    })
  }catch(error){
    console.log('Error al registrar: ', error)
  }
}

private updateUserData(user){
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const data: User = {
    id:user.uid,
    email:user.email,
    role : 'passenger',
  }
  return userRef.set(data,{merge:true})
}

}
