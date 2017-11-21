import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../../services';

@Component({
  selector: 'app-trending-list',
  templateUrl: './trending-list.component.html',
  styleUrls: ['./trending-list.component.scss']
})
export class TrendingListComponent implements OnInit {

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getTrendings()
      .subscribe(data => {
        console.log('data', data);
      });
  }

}
