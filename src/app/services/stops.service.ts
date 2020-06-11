import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { asLiteral } from '@angular/compiler/src/render3/view/util';

import {Stop} from '../models/stop.class'


@Injectable({
  providedIn: 'root'
})
export class StopsService {

  constructor(public afStore: AngularFirestore) { this.stopsCollection = afStore.collection<Stop>('stops');
  this.stops = this.stopsCollection.valueChanges();}


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

  addStop(stop: Stop):void{
    const id = this.afStore.createId();
    stop.id =id;
    this.stopsCollection.doc(id).set(stop);
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
