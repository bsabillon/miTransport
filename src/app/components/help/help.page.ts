import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  helpForm: FormGroup;
  messageList: any = [];
  isAdmin: boolean;

  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es requerido.' },
    ],
    issue: [
      { type: 'required', message: 'El asunto es requerido.' },
    ],
    message: [
      { type: 'required', message: 'El mensaje es requerido.' },
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public storage: Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private helpService: HelpService,
  ) {
    this.helpForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      issue: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      message: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getHelpMessages();
  }

  getHelpMessages() {
    this.storage.get('userAuth').then((data) => {
      console.log(data);
      if (data.role == 'admin') {
        this.isAdmin = true;
        this.helpService.getHelpMeesages(data.companyId).subscribe((result: any) => {
          let messages = {};
          messages = result.map(e => {
            return {
              uid: e.payload.doc.id,
              companyId: e.payload.doc.data()['companyId'],
              issue: e.payload.doc.data()['issue'],
              message: e.payload.doc.data()['message'],
              userEmail: e.payload.doc.data()['userEmail'],
              userId: e.payload.doc.data()['userId'],
              userName: e.payload.doc.data()['userName'],
              userphone: e.payload.doc.data()['userphone'],
            };
          });
          console.log(messages);
          this.messageList = messages;
        }, (error) => {
          console.log(error);
        });
      } else {
        this.isAdmin = false;
      }
    });
  }

  async sendMessage() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Porfavor espere...',
    });
    loading.present();
    this.storage.get('userAuth').then((data) => {
      const record = {};
      record['companyId'] = data.companyId;
      record['userEmail'] = data.email;
      record['userphone'] = data.phone;
      record['userId'] = data.uid;
      record['userName'] = this.helpForm.get('name').value;
      record['issue'] = this.helpForm.get('issue').value;
      record['message'] = this.helpForm.get('message').value;
      console.log(record);
      this.helpService.addHelpMessage(record).then((result) => {
        loading.dismiss();
        this.presentToast('El mensaje se envio correctamente.');
        this.helpForm.reset();
      }, (error) => {
        loading.dismiss();
        console.log(error);
        this.presentToast('El mensaje no pudo ser enviado.');
      });
    });
  }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

}
