import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import {User} from '../models/user.class';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isLog =false;
private isAdmininistrator = false;
  constructor(public afAuth: AngularFireAuth, private router: Router,private afs: AngularFirestore) {
    this.usersCollection =afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
   }

   private usersCollection : AngularFirestoreCollection<User>;
   private users : Observable<User[]>;
   private user: Observable<User>;
   private userDoc: AngularFirestoreDocument<User>;
   public  selectedUser: User = {
     id: null
   }; 

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
     // console.log(user);
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

async isAdmin(): Promise<boolean> {
  await this.afAuth.authState.subscribe((user) => {
    this.getUser(user.uid).subscribe((user)=>{
      if (user.role == 'admin') {
        console.log('admin servicio si');
        return this.isAdmininistrator = true;
      } else {
        console.log('admin servicio no');
        return this.isAdmininistrator = false;
      }
    })
  });
return this.isAdmininistrator;
}


getUser(userId: string){
  this.userDoc = this.afs.doc<User>(`users/${userId}`);
  return this.user = this.userDoc.snapshotChanges().pipe(map(action=>{
    if (action.payload.exists == false){
      return null;
    } else{
      const data = action.payload.data() as User;
      data.id = action.payload.id;
      return data;
    }
  }));
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
