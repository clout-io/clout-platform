import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { otherLinks } from '../other-links';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnChanges {
  @Input() socials;
  socialList: [any];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    this.socialList = this.socials.filter(item => {
      return !!otherLinks[item.network];
    });
  }

}
