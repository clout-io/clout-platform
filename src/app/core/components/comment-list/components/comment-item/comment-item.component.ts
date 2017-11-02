import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommentService, BroadcastService } from '../../../../../services';
import * as moment from 'moment'

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() item;
  @Input() level;

  child: any;
  maxLevel: number = 3;
  date: string = '';

  isAnswer: boolean = false;
  @ViewChild("textcomment") inputEl: ElementRef;

  constructor(private service: CommentService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.date = moment(this.item.createdAt).fromNow();
  }

  onToggleLike(id) {
    if (!id)
      return false;

    this.service.toggleLike(id)
      .subscribe(
        response => {
          const { count, like } = response;
          this.item.likes = count;
          this.item.isLiked = like ? true : false;
        }
      )
  }

  showAnswer() {
    this.isAnswer = true;

    setTimeout(() => {
      this.inputEl.nativeElement.focus();
    }, 0);
  }

  hideAnswer() {
    const {value} = this.inputEl.nativeElement;
    this.isAnswer = !!value ? true : false;
  }

  addComment(text) {
    this.service.addComment(this.item.id, text).subscribe(
      response => {
        this.broadcastService.broadcast('commentsCount', response.count);
      }
    )
  }
}
