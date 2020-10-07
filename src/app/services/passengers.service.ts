import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import {Passenger} from '../models/passenger.class';
import {User} from '../models/user.class';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  constructor(
    public afStore: AngularFirestore,
    public authService: AuthService
    )
    { 
    const currentCompany = this.authService.currentUser.companyId; 
    this.usersCollection = this.afStore.collection<User>('users', ref => ref.where('companyId','==',currentCompany) && ref.where('role','==', 'passenger'))
    this.users = this.usersCollection.valueChanges();

  }

  private usersCollection : AngularFirestoreCollection<User>;
  private users : Observable<User[]>;
  private user: Observable<User>;
  private userDoc: AngularFirestoreDocument<User>;
  public  selectedUser: User = {
    uid: null
  };  

  getUsers(){
    return this.users = this.usersCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map( action => {
        const data = action.payload.doc.data() as User;
        return data;
      })
    }));
  }

  getUser(userId: string){
    this.userDoc = this.afStore.doc<User>(`users/${userId}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action=>{
      if (action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as User;
        data.uid = action.payload.id;
        return data;
      }
    }));
  }

  addUserr(user: User):void{
    const id = this.afStore.createId();
    user.uid =id;
    this.usersCollection.doc(id).set(user);
  }

  updateUser(user: User):void{
    let passengerId = user.uid;
    this.userDoc = this.afStore.doc<User>
    (`passengers/${passengerId}`);
    this.userDoc.update(user);
  }

  deleteUser(userId: string):void {
    this.userDoc = this.afStore.doc<User>(`users/${userId}`);
    this.userDoc.delete(); 
  }


}
