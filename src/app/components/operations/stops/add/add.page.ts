import { Component, OnInit } from '@angular/core';
import {StopsService} from '../../../../services/stops.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(public stopsService: StopsService) { }

  ngOnInit() {
  }

  addStop(formStop: NgForm):void{
    if(formStop.value.id == null){
      this.stopsService.addStop(formStop.value);
    }else{
      this.stopsService.updateStop(formStop.value);
    }
    formStop.reset();
  }


}
