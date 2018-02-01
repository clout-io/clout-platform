import { Component, OnInit } from '@angular/core';
import {IcosService} from '../../../services/icosService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-ico',
  templateUrl: './add-ico.component.html',
  styleUrls: ['./add-ico.component.scss']
})
export class AddIcoComponent implements OnInit {

  constructor(private icosService: IcosService,
              private router: Router) { }

  ngOnInit() {
  }

  cancel() {
  }

  addIco(data) {
    this.icosService.addIco(data).take(1)
      .subscribe(responce => {
        alert('New ICO was successfully saved!');
        this.router.navigate(['/icos', 'all']);
      }, error => {
        alert('Something went wrong! Try again!');
      });
  }

}
