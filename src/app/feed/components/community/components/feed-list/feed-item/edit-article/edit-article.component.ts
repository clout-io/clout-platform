import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { FeedService } from '../../../../../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() feed;
  @Input() editable: boolean;
  @Input() categories;
  @Output() onSaveCancel = new EventEmitter<string>();
  @Output() onSelect = new EventEmitter<string>();
  @Output() onDoAction = new EventEmitter();
  @ViewChild('text_block') text_block: ElementRef;
  public textBlockHeight: number;
  public text: string;
  public editorContent: string;
  public category: string;

  constructor(
    private router: Router,
    private feedService: FeedService,
    private elRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.text = this.parseTagsHref(this.feed.text);

    if (!this.editable) {
      if (!!changes.editable && !changes.editable.firstChange) {
        setTimeout(() => this.updateContent(), 0);
      }
      setTimeout(() => this.parseTags(), 0);
    }
    if (!!this.text_block) {
      this.textBlockHeight = this.text_block.nativeElement.offsetHeight;
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.updateContent();
  }

  goByTag($event) {
    $event.preventDefault();
    const tagName = $event.target.innerHTML.trim().slice(1);
    this.router.navigateByUrl(`/home/community/hashtag/${tagName}`);
  }

  updateContent() {
    this.text_block.nativeElement.insertAdjacentHTML('afterbegin', this.text);
  }

  parseTags() {
    const tags = this.elRef.nativeElement.querySelectorAll('a');
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].href.lastIndexOf('hashtagref') !== -1) {
        tags[i].addEventListener('click', this.goByTag.bind(this));
        const tagName = tags[i].innerHTML.trim().slice(1);
        tags[i].setAttribute('href', `/home/community/hashtag/${tagName}`);
      }
    }
  }

  parseTagsHref(str) {
    if (str) { return str.replace(new RegExp('href=\"javascript:;\"', 'g'), 'href="hashtagref"'); }
    return '';
  }

  saveOrCancel(flag: boolean) {
    if (!flag) {
      this.onDoAction.emit({key: 'cancel', payload: null});
      return;
    }

    const params = {
      text: this.editorContent,
      category: this.category || this.feed.category.id,
      type: 'article',
    };
    this.onDoAction.emit({key: 'save', payload: params});
  }

  onChangeEditor(data): void {
    this.editorContent = data.editorContent;
  }

  chooseCategory(category: string): void {
    this.category = category;
  }

}
