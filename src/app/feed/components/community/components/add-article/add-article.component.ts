import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FeedService, BroadcastService } from '../../../../../services';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  public categories;
  private category: string;
  public hasPublish = false;
  public disabled = true;
  public changeEditorData;
  @Output() onResetEditor = new EventEmitter();

  constructor(private feedService: FeedService,
              private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.feedService.getCategories().take(1)
      .subscribe(res => this.categories = res);
  }

  publishClickEvent() {
    const params = {
      text: this.changeEditorData.editorContent,
      category: this.category,
      type: 'article'
    };

    this.feedService.feedCreate(params)
      .subscribe(data => {
        this.broadcastService.broadcast('updateNewsList', data);
        this.broadcastService.broadcast('resetArticleEditor', data);
      });
  }

  chooseCategory(category: string) {
    this.category = category;
    this.checkBtnDisabling();
  }

  onChangeEditor(data) {
    this.changeEditorData = data;
    this.checkBtnDisabling();
  }

  checkBtnDisabling(): void {
    const { eventName, isEditorEmpty } = this.changeEditorData;
    this.hasPublish = eventName === 'focus' || !isEditorEmpty;
    this.disabled = isEditorEmpty || !this.category;
  }

}
