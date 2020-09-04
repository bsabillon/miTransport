import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { asLiteral } from '@angular/compiler/src/render3/view/util';

import {Stop} from '../models/stop.class'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class StopsService {

  constructor(
    public afStore: AngularFirestore, 
    public authService: AuthService
    )
    { 
    const currentCompany = this.authService.currentUser.companyId;    
    this.stopsCollection = this.afStore.collection<Stop>('stops', ref => ref.where('companyId','==',currentCompany ))
    this.stops = this.stopsCollection.valueChanges();
  }


  private stopsCollection : AngularFirestoreCollection<Stop>;
  private stops : Observable<Stop[]>;
  private stop: Observable<Stop>;
  private stopDoc: AngularFirestoreDocument<Stop>;
  public  selectedStop: Stop = {
    id: null
  };  


  getStops(){
    return this.stops = this.stopsCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map( action => {
        const data = action.payload.doc.data() as 
        Stop;
        return data;
      })
    }));
  }

  getStop(stopId: string){
    this.stopDoc = this.afStore.doc<Stop>(`stops/${stopId}`);
    return this.stop = this.stopDoc.snapshotChanges().pipe(map(action=>{
      if (action.payload.exists == false){
        return null;
      } else{
        const data = action.payload.data() as Stop;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addStop(record) {
    const id = this.afStore.createId();
    record['id'] =id;
    return this.stopsCollection.doc(id).set(record);
  }

  updateStop(stop: Stop):void{
    let stopId = stop.id;
    this.stopDoc = this.afStore.doc<Stop>
    (`stops/${stopId}`);
    this.stopDoc.update(stop);
  }

  deleteStop(stopId: string):void {
    this.stopDoc = this.afStore.doc<Stop>(`stops/${stopId}`);
    this.stopDoc.delete(); 
  }

}
