import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import {Passenger} from '../models/passenger.class';


@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  constructor(public afStore: AngularFirestore) { 
    this.passengersCollection =afStore.collection<Passenger>('passengers');
    this.passengers = this.passengersCollection.valueChanges();

  }

  private passengersCollection : AngularFirestoreCollection<Passenger>;
  private passengers : Observable<Passenger[]>;
  private passenger: Observable<Passenger>;
  private passengerDoc: AngularFirestoreDocument<Passenger>;
  public  selectedPassenger: Passenger = {
    id: null
  };  

  getPassengers(){
    return this.passengers = this.passengersCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map( action => {
        const data = action.payload.doc.data() as Passenger;
       // data.uid = action.payload.doc.id;
        return data;
      })
    }));
  }

  getPassenger(passengerId: string){
    this.passengerDoc = this.afStore.doc<Passenger>(`passengers/${passengerId}`);
    return this.passenger = this.passengerDoc.snapshotChanges().pipe(map(action=>{
      if (action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as Passenger;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addPassenger(passenger: Passenger):void{
    const id = this.afStore.createId();
    passenger.id =id;
    this.passengersCollection.doc(id).set(passenger);
  }

  updatePassenger(passenger: Passenger):void{
    let passengerId = passenger.id;
    this.passengerDoc = this.afStore.doc<Passenger>
    (`passengers/${passengerId}`);
    this.passengerDoc.update(passenger);
  }

  deletePassenger(passengerId: string):void {
    this.passengerDoc = this.afStore.doc<Passenger>(`passengers/${passengerId}`);
    this.passengerDoc.delete(); 
  }


}
