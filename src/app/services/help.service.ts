import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(
    private router: Router,
    public afStore: AngularFirestore,
  ) { }

  existRoom(companyId: any, userId) {
    return this.afStore.collection('help').doc(`help_${companyId}${userId}`).get();
  }

  addRoom(companyId: any, record, userId) {
    return this.afStore.collection('help').doc(`help_${companyId}${userId}`).set(record);
  }

  addMessage(recordMessage: any, companyId: any, userId) {
    return this.afStore.collection('help').doc(`help_${companyId}${userId}`).collection('messages').add(recordMessage);
  }

  getRooms(): Observable<any[]> {
    return this.afStore.collection('help').valueChanges();
  }

  getMessage(companyId, userId): Observable<any[]> {
    return this.afStore.collection('help').doc(`help_${companyId}${userId}`).collection('messages', ref => ref.orderBy('dateTime')).valueChanges();
  }
}
