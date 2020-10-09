import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  public trip: any = [];
  public tripId: string;
  public canEnroll: boolean;

  constructor(
    public tripsServices: TripsService, 
    public router: Router,
    public route : ActivatedRoute,
    public alertController: AlertController,
    private storage: Storage,
  ) { 
    this.tripId = route.snapshot.queryParamMap.get('tripId');
    console.log(this.tripId);
  }

  ngOnInit() {
    this.getTrip();
  }

  getTrip(){
    this.tripsServices.getTrip(this.tripId).subscribe(trip => {
      this.trip = trip;
      // console.log(trip);
      this.isUserOnTrip(trip.id);
    });
  }

  isUserOnTrip(tripId: string){
      let passengers  =this.trip.passengers;
      this.storage.get('userAuth').then((data)=>{
        console.log(passengers);
        console.log(data.name);
       if(passengers.includes(data.name)){
         console.log("true");
         this.canEnroll = false;
        }
        else{
          console.log("false");
          this.canEnroll = true;
        }
      })
  }

  enrollMe(){
    let passengers =this.trip.passengers;
    this.storage.get('userAuth').then((data)=>{
      this.trip.passengers.push(data.name);
      this.tripsServices.updateTrip(this.trip);
      console.log(data.name +"has been enrolled");
    })
  }

  async enrollAlert() {
    const alert = await this.alertController.create({
      message: '¿Estas seguro que deseas inscribirte a este viaje?',
      mode: 'ios',
      buttons: [{text: 'Cancelar', role: 'cancel'}, {text: 'Si', handler: () => {
        this.enrollMe();
      }}]
    });
    await alert.present();
  }

}
