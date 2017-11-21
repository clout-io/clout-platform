import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss']
})
export class PostCategoriesComponent implements OnInit {
  @Input() categoryId: string;
  @Input() categories;

  constructor() { }

  ngOnInit() {
  }

}
