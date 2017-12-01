import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss']
})
export class PostCategoriesComponent implements OnInit, OnDestroy {
  @Input() categoryId: string;
  @Input() categories;

  @Input() createFor: string; //displayTagList, createPost
  @Output() onSelect = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectCategory(event, category: string) {
    event.preventDefault();
    event.stopPropagation();
    this.categoryId = category;
    this.onSelect.emit(category);
  }

  ngOnDestroy(): void {
    if (this.createFor === 'createPost') {
      this.onSelect.emit(null);
    }
  }

}
