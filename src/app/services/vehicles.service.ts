import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Vehicle} from '../models/vehicle.class'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { asLiteral } from '@angular/compiler/src/render3/view/util';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(public afStore: AngularFirestore) {
    this.vehiclesCollection = afStore.collection<Vehicle>('vehicles');
    this.vehicles = this.vehiclesCollection.valueChanges();

   }

private vehiclesCollection : AngularFirestoreCollection<Vehicle>;
private vehicles : Observable<Vehicle[]>;
private vehicle: Observable<Vehicle>;
private vehicleDoc: AngularFirestoreDocument<Vehicle>;
public  selectedVehicle: Vehicle = {
  id: null
};  



  getVehicles(){
    return this.vehicles = this.vehiclesCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map( action => {
        const data = action.payload.doc.data() as 
        Vehicle;
       // data.uid = action.payload.doc.id;
        return data;
      })
    }));
  }

  getVehicle(vehicleId: string){
    this.vehicleDoc = this.afStore.doc<Vehicle>(`vehicles/${vehicleId}`);
    return this.vehicle = this.vehicleDoc.snapshotChanges().pipe(map(action=>{
      if (action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as Vehicle;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addVehicle(vehicle: Vehicle):void{
    const id = this.afStore.createId();
    vehicle.id =id;
    this.vehiclesCollection.doc(id).set(vehicle);
  }

  updateVehicle(vehicle: Vehicle):void{
    let vehicleId = vehicle.id;
    this.vehicleDoc = this.afStore.doc<Vehicle>
    (`vehicles/${vehicleId}`);
    this.vehicleDoc.update(vehicle);
  }

  deleteVehicle(vehicleId: string):void {
    this.vehicleDoc = this.afStore.doc<Vehicle>(`vehicles/${vehicleId}`);
    this.vehicleDoc.delete(); 
  }

}