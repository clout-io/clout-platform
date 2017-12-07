import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FeedService } from '../../../../../services/feed';

@Component({
  selector: 'app-single-post-item',
  templateUrl: './single-post-item.component.html',
  styleUrls: ['./single-post-item.component.scss']
})
export class SinglePostItemComponent implements OnInit {
  private route$: any;
  public feed;
  public categories;
  public showError: boolean;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private feedService: FeedService) { }

  ngOnInit() {
    this.route$ = this.route.params.subscribe((params: Params) => {
      const { id } = params;
      this.feedService.getFeed(id).take(1)
        .subscribe((data) => this.feed = data,
          error => this.showError = true);
    });

    this.feedService.getCategories().take(1)
      .subscribe(res => this.categories = res);
  }

  deletePost(id: string): void {
    this.feedService.deleteFeed(id).take(1)
      .subscribe(() => {
        this.feed = null;
        setTimeout(() => {
          this.router.navigateByUrl('/home/community');
        }, 1000);
      });
  }

}
