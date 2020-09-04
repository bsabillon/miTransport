import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Driver} from '../models/driver.class'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(
    public afStore: AngularFirestore,
    public authService: AuthService
    )
    { 
    const currentCompany = this.authService.currentUser.companyId; 
    this.driversCollection = this.afStore.collection<Driver>('drivers', ref => ref.where('companyId','==',currentCompany ));
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
        const data = action.payload.doc.data() as Driver;
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

  addDriver(record) {
    const id = this.afStore.createId();
    record['id'] =id;
    return this.driversCollection.doc(id).set(record);
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
