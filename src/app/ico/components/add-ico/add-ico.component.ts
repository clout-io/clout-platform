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

    const {sendData, form, membersForm, premiumForm} = data;

    this.icosService.addIco(sendData).take(1)
      .subscribe(responce => {
        alert('New ICO was successfully saved!');
        this.router.navigate(['/icos', 'all']);
      }, errors => {
        window.scrollTo(0, 0);
        if (errors.invalidAttributes) {
          if (errors.invalidAttributes.slug
            && errors.invalidAttributes.slug[0] && errors.invalidAttributes.slug[0].rule === 'unique') {
            let message = errors.invalidAttributes.slug[0].message;
            message = message.replace('\`slug\`', 'name');
            form.controls.name.setErrors({'serverError': message});
          }
          Object.keys(errors.invalidAttributes).forEach(key => {
            if (typeof form.value[key] !== 'undefined') {
              if (errors.invalidAttributes[key] && errors.invalidAttributes[key][0]) {
                form.controls[key].setErrors({'serverError': errors.invalidAttributes[key][0].message});
              }
            }
            if (typeof premiumForm.value[key] !== 'undefined') {
              if (errors.invalidAttributes[key] && errors.invalidAttributes[key][0]) {
                premiumForm.controls[key].setErrors({'serverError': errors.invalidAttributes[key][0].message});
              }
            }
          });
        } /*else {
          Object.keys(errors).forEach((key, value) => {
            if (typeof form.value[key] !== 'undefined') {
              form.controls[key].setErrors({'serverError': errors[key]});
            }
            if (typeof premiumForm.value[key] !== 'undefined') {
              premiumForm.controls[key].setErrors({'serverError': errors[key]});
            }
          });
        }*/
        setTimeout(() => { alert('Something went wrong! Try again!'); }, 200);
      });
  }

}
