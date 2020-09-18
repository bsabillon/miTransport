import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(
    private router: Router,
    public afStore: AngularFirestore,
  ) { }

  addHelpMessage(record) {
    return this.afStore.collection('help').add(record);
  }

  getHelpMeesages(companyId) {
    return this.afStore.collection('help', ref => ref.where('companyId', '==', `${companyId}`)).snapshotChanges();
  }
}
