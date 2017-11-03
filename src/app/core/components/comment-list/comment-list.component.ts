import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommentService, BroadcastService } from '../../../services';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnChanges {
  @Input() item;
  @Input() type;

  comments: any;
  subscription: any;
  level: number = 1;

  constructor(private service: CommentService, private broadcastService: BroadcastService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const {item} = changes;
    const {currentValue} = item;

    if (currentValue) {
      const {id} = currentValue;
      this.loadComments(id);
    }
  }

  onNotify(response) {
    this.loadComments(this.item.id);
    this.item.comments = response.count;
    this.item.clc = response.clc ? response.clc : this.item.clc;
  }

  onToggleLike(id) {
    if (!id)
      return false;

    this.service.toggleLike(id)
      .subscribe(
        response => {
          const { count, like, clc } = response;
          this.item.likes = count;
          this.item.isLiked = like ? true : false;
          this.item.clc = clc;
        }
      )
  }

  onVote(vote) {
    this.service.vote(this.item.id, vote)
      .subscribe(
        response => {
          const { downvote, upvote, clc } = response;
          this.item.clc = clc;
          this.item.votes = { downvote: downvote, upvote: upvote };
          this.item.voted = this.item.voted ?
            (this.item.voted === '+' && vote === '+' || this.item.voted === '-' && vote === '-' ?
              '' : ( this.item.voted === '-' && vote === '+' ? '+' : '-'))
            : vote;
        }
      )
  }

  loadComments(id) {
    if (!id)
      return false;

    this.service.getComments(id)
      .subscribe(
        response => {
          this.comments = response;
        }
      )
  }

  addComment(text) {
    this.service.addComment(this.item.id, text).subscribe(
      response => {
        this.loadComments(this.item.id);
        this.item.comments = response.count;
        this.item.clc = response.clc;
      }
    )
  }
}
