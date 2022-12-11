import { transitionNew } from '../../../shared/animations/comments.animation'
import { trigger } from '@angular/animations'
import { PostCommented } from './../../models/post.model'

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/post.model'

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.pug',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input() post!: Post
  @Output() newComment: EventEmitter<PostCommented> = new EventEmitter<PostCommented>()
  public onNewComment(comment: string) {
    const postComment = {comment: comment, postId: this.post.id}
    this.newComment.emit(postComment)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
