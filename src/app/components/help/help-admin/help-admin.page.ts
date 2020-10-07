import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-help-admin',
  templateUrl: './help-admin.page.html',
  styleUrls: ['./help-admin.page.scss'],
})
export class HelpAdminPage implements OnInit {
  existRoomSubs: Subscription;
  messageSubs: Subscription;
  roomsSubs: Subscription;
  messageForm: FormGroup;
  messageList: any = [];
  userId: any;
  userName: any;

  constructor(
    public formBuilder: FormBuilder,
    public storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private helpService: HelpService,
    public route : ActivatedRoute,
  ) {
    this.userId = route.snapshot.queryParamMap.get('userId');
    this.userName = route.snapshot.queryParamMap.get('userName');
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
    (this.messageSubs == undefined) ? '' : this.messageSubs.unsubscribe();
  }

  getIfAdmin() {
    this.storage.get('userAuth').then((data) => {
        this.getMessages(data.companyId);
    });
  }

  getMessages(companyId) {
    this.messageSubs = this.helpService.getMessage(companyId, this.userId).subscribe((messages) => {
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
        this.existRoomSubs = this.helpService.existRoom(data.companyId, this.userId).subscribe((result) => {
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
            recordMessage['dateTime'] = parseInt( `${(year < 10) ? `0${year}` : year}${month}${(day < 10)? `0${day}` : day}${hour}${minute}${second}`) ;
            recordMessage['dateSplit'] = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
            this.helpService.addMessage(recordMessage, data.companyId, this.userId).then(() => {
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
            this.helpService.addRoom(data.companyId, recordRoom, this.userId).then(() => {
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
              recordMessage['dateTime'] = parseInt( `${(year < 10) ? `0${year}` : year}${month}${(day < 10)? `0${day}` : day}${hour}${minute}${second}`);
              recordMessage['dateSplit'] = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
              this.helpService.addMessage(recordMessage, data.companyId, this.userId).then(() => {
                this.existRoomSubs.unsubscribe();
                this.messageForm.reset();
              });
            })
          }
        });
      });
    }
  }

}
