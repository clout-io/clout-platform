import { Component, OnInit, Input } from '@angular/core';

import { BroadcastService, FollowService } from '../../../services';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html',
  styleUrls: ['./follow-btn.component.scss']
})
export class FollowBtnComponent implements OnInit {
  @Input() coin;

  constructor(
    private broadcastService: BroadcastService,
    private followService: FollowService
  ) { }

  ngOnInit() {
  }

  follow() {
    this.followService.follow(this.coin.id)
      .subscribe(data => {
        this.broadcastService.broadcast('follow', this.coin);
      });
  }
}
