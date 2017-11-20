import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { otherLinks } from '../other-links';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit, OnChanges {
  @Input() socials;
  socialNames = {
    'facebook': 'fa fa-facebook',
    'twitter': 'fa fa-twitter',
    'linkedin': 'fa fa-linkedin',
    'reddit': 'fa fa-reddit',
    'slack': 'fa fa-slack',
    'github': 'fa fa-github-alt',
    'youtube': 'fa fa-youtube-play',
    'telegram': 'fa fa-telegram',
    'bitcoin': 'fa fa-btc',
    'instagram': 'fa fa-instagram',
    'google': 'fa fa-google',
    'other': 'fa fa-dot-circle-o'
  };
  socialList: [any];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    this.socialList = this.socials.filter(item => {
      const socialFound = this.socialNames[item.network];
      const otherLinkFound = otherLinks[item.network];
      if (!!socialFound) {
        item.className = socialFound;
        return true;
      } else if (!otherLinkFound) {
        item.className = this.socialNames['other'];
        return true;
      }
      return false;
    });
  }

}
