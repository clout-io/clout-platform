import { Component, OnInit } from '@angular/core';
import {IcosService} from '../../../services/icosService';

@Component({
  selector: 'app-add-ico',
  templateUrl: './add-ico.component.html',
  styleUrls: ['./add-ico.component.scss']
})
export class AddIcoComponent implements OnInit {

  constructor(private icosService: IcosService) { }

  ngOnInit() {
  }

  cancel() {
  }

  addIco(data) {
    console.log('data', data);
    this.icosService.addIco(data).take(1)
      .subscribe(responce => {
        console.log('responce', responce);
      });
  }

}
