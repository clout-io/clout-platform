import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../../../../services';
import * as moment from 'moment';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html'
})
export class FeedItemComponent implements OnInit {
  @Input() feed;
  createDate: string = '';

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.createDate = moment(this.feed.createdAt).fromNow();
  }
}
