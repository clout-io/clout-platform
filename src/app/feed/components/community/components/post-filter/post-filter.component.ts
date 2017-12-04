import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.scss']
})
export class PostFilterComponent implements OnInit, OnDestroy {
  private routeChange$;
  public filter;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeChange$ = this.route.params.subscribe((params: Params) => {
      const { category, tag } = params;
      this.filter = { category, tag };
    });
  }

  ngOnDestroy(): void {
    this.routeChange$.unsubscribe();
  }

}
