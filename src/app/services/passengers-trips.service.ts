import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { AuthService } from './auth.service';
import {Trip} from '../models/trip.class'

@Injectable({
  providedIn: 'root'
})
export class PassengersTripsService {

  constructor(
    public afStore: AngularFirestore,
    public authService: AuthService
  ) {
    const companyCurrentUser = this.authService.currentUser.company;
    this.tripsCollection = this.afStore.collection<Trip>('trips', ref => ref.where('userUid','==',companyCurrentUser ));
    this.trips = this.tripsCollection.valueChanges();
   }

   private tripsCollection : AngularFirestoreCollection<Trip>;
   private trips : Observable<Trip[]>;
   private trip: Observable<Trip>;
   private tripDoc: AngularFirestoreDocument<Trip>;
   public  selectedTrip: Trip = {
     id: null
   };  

   getTrips(){
    return this.trips = this.tripsCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map( action => {
        const data = action.payload.doc.data() as Trip;
        return data;
      })
    }));
  }

  getTrip(tripId: string){
    this.tripDoc = this.afStore.doc<Trip>(`trips/${tripId}`);
    return this.trip = this.tripDoc.snapshotChanges().pipe(map(action=>{
      if (action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as Trip;
        data.id = action.payload.id;
        return data;
      }
    }));
  }


}
