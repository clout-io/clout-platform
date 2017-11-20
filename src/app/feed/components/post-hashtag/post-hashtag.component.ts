import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-hashtag',
  templateUrl: './post-hashtag.component.html',
  styleUrls: ['./post-hashtag.component.scss']
})
export class PostHashtagComponent implements OnInit, OnDestroy {
  private routeChange$;
  public hashtag: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeChange$ = this.route.params.subscribe((params: Params) => {
      this.hashtag = params['id'];
    });
  }

  ngOnDestroy(): void {
    this.routeChange$.unsubscribe();
  }

}
