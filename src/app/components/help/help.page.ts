import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  existRoomSubs: Subscription;
  messageSubs: Subscription;
  roomsSubs: Subscription;
  messageForm: FormGroup;
  messageList: any = [];
  roomList: any = [];
  isAdmin: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private helpService: HelpService,
  ) {
    this.messageForm = formBuilder.group({
      text_message: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getIfAdmin();
  }

  ionViewDidLeave() {
    (this.roomsSubs == undefined) ? '' : this.roomsSubs.unsubscribe();
    (this.messageSubs == undefined) ? '' : this.messageSubs.unsubscribe();
  }

  getIfAdmin() {
    this.storage.get('userAuth').then((data) => {
      if (data.role === 'admin') {
        this.isAdmin = true;
        this.getRooms();
      } else {
        this.isAdmin = false;
        this.getMessages(data.companyId, data.uid);
      }
    });
  }

  getRooms() {
    this.roomsSubs = this.helpService.getRooms().subscribe((rooms) => {
      this.roomList = rooms;
      console.log(this.roomList);
    });
  }

  getMessages(companyId, userId) {
    this.messageSubs = this.helpService.getMessage(companyId, userId).subscribe((messages) => {
      this.messageList = messages;
      console.log(this.messageList);
    });
  }

  convertUnixToDate(date: any) {
    var dateSp =  date.split('-');
    return `${dateSp[0]}/${dateSp[1]}/${dateSp[2]} ${dateSp[3]}:${dateSp[4]}:${dateSp[5]}`;
  }

  sendMessage() {
    if (this.messageForm.get('text_message').value) {
      this.storage.get('userAuth').then((data) => {
        this.existRoomSubs = this.helpService.existRoom(data.companyId, data.uid).subscribe((result) => {
          if (result.exists) {
            const recordMessage = {};
            recordMessage['message'] = this.messageForm.get('text_message').value;
            recordMessage['read'] = false;
            recordMessage['role'] = data.role;
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            recordMessage['dateTime'] = `${year}${month}${day}${hour}${minute}${second}`;
            recordMessage['dateSplit'] = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
            this.helpService.addMessage(recordMessage, data.companyId, data.uid).then(() => {
              this.existRoomSubs.unsubscribe();
              this.messageForm.reset();
            });
          } else {
            const recordRoom = {}
            recordRoom['userEmail'] = data.email;
            recordRoom['name'] = data.name;
            recordRoom['userphone'] = data.phone;
            recordRoom['userId'] = data.uid;
            recordRoom['companyId'] = data.companyId;
            this.helpService.addRoom(data.companyId, recordRoom, data.uid).then(() => {
              const recordMessage = {};
              recordMessage['message'] = this.messageForm.get('text_message').value;
              recordMessage['read'] = false;
              recordMessage['role'] = data.role;
              const date = new Date();
              const day = date.getDate();
              const month = date.getMonth()+1;
              const year = date.getFullYear();
              const hour = date.getHours();
              const minute = date.getMinutes();
              const second = date.getSeconds();
              recordMessage['dateTime'] = parseInt( `${year}${month}${day}${hour}${minute}${second}`) ;
              recordMessage['dateSplit'] = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
              this.helpService.addMessage(recordMessage, data.companyId, data.uid).then(() => {
                this.existRoomSubs.unsubscribe();
                this.messageForm.reset();
              });
            })
          }
        });
      });
    }
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

}
