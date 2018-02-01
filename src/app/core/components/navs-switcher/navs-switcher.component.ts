import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-navs-switcher',
  templateUrl: './navs-switcher.component.html',
  styleUrls: ['./navs-switcher.component.scss']
})
export class NavsSwitcherComponent implements OnInit {
  @Input() createFor: string;
  navsList = [];

  constructor() {}

  ngOnInit() {
    if (this.createFor === 'icos') {
      this.navsList = [
        {link: 'all', text: 'All'},
        {link: 'upcoming', text: 'Upcoming'},
        {link: 'ongoing', text: 'Ongoing'},
        {link: 'closed', text: 'Closed'}
      ];
    } else if (this.createFor === 'feed') {
      this.navsList = [
        {link: 'community', text: 'Community'},
        {link: 'news', text: 'News'},
        {link: 'all', text: 'All'}
      ];
    }
  }

}
