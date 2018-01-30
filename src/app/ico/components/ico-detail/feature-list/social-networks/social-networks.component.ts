import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { otherLinks } from '../other-links';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit, OnChanges {
  @Input() icoData;
  socialNames = [
    {key: 'other', styleClass: 'fa-dot-circle-o'},
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
  socialList: [any];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    this.socialList = this.icoData.socials.filter(item => {
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
