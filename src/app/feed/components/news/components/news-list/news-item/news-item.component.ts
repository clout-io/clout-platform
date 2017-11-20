/**
 * Created by ivan on 09.11.17.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html'
})
export class NewsListItemComponent implements OnInit {
  @Input() item;

  constructor() { }

  ngOnInit() { }
}
