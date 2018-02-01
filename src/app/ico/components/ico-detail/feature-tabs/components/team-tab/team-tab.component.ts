import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-team-tab',
  templateUrl: './team-tab.component.html',
  styleUrls: ['./team-tab.component.scss']
})
export class TeamTabComponent implements OnInit, OnChanges {
  @Input() icoData;

  constructor() { }

  ngOnChanges(changes): void {
    if (!this.icoData || !this.icoData.team) { return; }

    const sortByOrder = (a, b): number => {
      if (a.order < b.order) { return -1; }
      if (a.order > b.order) { return 1; }
      return 0;
    };
    this.icoData.team.sort(sortByOrder);
  }

  ngOnInit() {
  }

}
