import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.scss']
})
export class SelectIconComponent implements OnInit {
  @Input() formField;
  icons = [
    {key: 'dot-circle-o', styleClass: 'fa-dot-circle-o'},
    {key: 'twitter', styleClass: 'fa-twitter'},
    {key: 'facebook', styleClass: 'fa-facebook'},
    {key: 'youtube-play', styleClass: 'fa-youtube-play'},
    {key: 'linkedin', styleClass: 'fa-linkedin'},
    {key: 'slack', styleClass: 'fa-slack'},
    {key: 'github-alt', styleClass: 'fa-github-alt'},
    {key: 'telegram', styleClass: 'fa-telegram'},
    {key: 'btc', styleClass: 'fa-btc'},
    {key: 'reddit', styleClass: 'fa-reddit'},
    {key: 'google', styleClass: 'fa-google'},
    {key: 'instagram', styleClass: 'fa-instagram'},
    {key: 'steemit', styleClass: 'icon-steemit'},
    {key: 'medium', styleClass: 'icon-medium'},
  ];
  activeIcon = this.icons[0];

  constructor() { }

  ngOnInit() {
  }

  selectIcon(icon) {
    this.activeIcon = icon;
    this.formField.setValue({...this.activeIcon});
  }

}
