import { Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { CommentService } from '../../../services';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentListComponent implements OnInit, OnChanges {
  @Input() item;
  comments: any;

  constructor(private service: CommentService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const {item} = changes;
    const {currentValue} = item;

    if (currentValue) {
      const {id} = currentValue;
      this.loadComments(id);
    }
  }

  onToggleLike() {
    this.service.toggleLike(this.item.id)
      .subscribe(
        response => {
          const { count, like } = response;
          this.item.likes = count;
          this.item.isLiked = like ? true : false;
        }
      )
  }

  onVote(vote) {
    this.service.vote(this.item.id, vote)
      .subscribe(
        response => {
          const { downvote, upvote } = response;
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
}
