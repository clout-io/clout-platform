import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit, OnChanges {
  @Input() icoData;
  socialTypes = {
    'other': 'fa-dot-circle-o',
    'twitter': 'fa-twitter',
    'facebook': 'fa-facebook',
    'youtube-play': 'fa-youtube-play',
    'linkedin': 'fa-linkedin',
    'slack': 'fa-slack',
    'github-alt': 'fa-github-alt',
    'telegram': 'fa-telegram',
    'btc': 'fa-btc',
    'reddit': 'fa-reddit',
    'google': 'fa-google',
    'instagram': 'fa-instagram',
    'steemit': 'icon-steemit',
    'medium': 'icon-medium',
  };
  socialList = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(): void {
    if (!this.icoData.socials) { return; }

    this.socialList = this.icoData.socials.map(item => {
      if (this.socialTypes[item.type]) {
        const {type, link} = item;
        return {type, link, className: this.socialTypes[item.type]};
      }
    });
  }

}
