import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Driver} from '../models/driver.class'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { asLiteral } from '@angular/compiler/src/render3/view/util';


@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(public afStore: AngularFirestore) { 
    this.driversCollection = afStore.collection<Driver>('drivers');
    this.drivers = this.driversCollection.valueChanges();
  }

  private driversCollection : AngularFirestoreCollection<Driver>;
  private drivers : Observable<Driver[]>;
  private driver: Observable<Driver>;
  private driverDoc: AngularFirestoreDocument<Driver>;
  public  selectedDriver: Driver = {
    id: null
  }; 


  getDrivers(){
    return this.drivers = this.driversCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map( action => {
        const data = action.payload.doc.data() as 
        Driver;
       // data.uid = action.payload.doc.id;
        return data;
      })
    }));
  }

  getVehicle(driverId: string){
    this.driverDoc = this.afStore.doc<Driver>(`vehicles/${driverId}`);
    return this.driver = this.driverDoc.snapshotChanges().pipe(map(action=>{
      if (action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as Driver;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addVehicle(driver: Driver):void{
    const id = this.afStore.createId();
    driver.id =id;
    this.driversCollection.doc(id).set(driver);
  }

  updateVehicle(driver: Driver):void{
    let driverId = driver.id;
    this.driverDoc = this.afStore.doc<Driver>
    (`vehicles/${driverId}`);
    this.driverDoc.update(driver);
  }

  deleteVehicle(driverId: string):void {
    this.driverDoc = this.afStore.doc<Driver>(`drivers/${driverId}`);
    this.driverDoc.delete(); 
  }


}
