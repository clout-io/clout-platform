import { Component, OnInit } from '@angular/core';
import {IcosService} from '../../../services/icosService';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth';

@Component({
  selector: 'app-add-ico',
  templateUrl: './add-ico.component.html',
  styleUrls: ['./add-ico.component.scss']
})
export class AddIcoComponent implements OnInit {

  constructor(private icosService: IcosService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  cancel(event) {
  }

  addIco(data) {
    if (!this.authService.isAdmin()) { return; }

    this.icosService.addIco(data).take(1)
      .subscribe(responce => {
        alert('New ICO was successfully saved!');
        this.router.navigate(['/icos', 'all']);
      }, error => {
        alert('Something went wrong! Try again!');
      });
  }

}
