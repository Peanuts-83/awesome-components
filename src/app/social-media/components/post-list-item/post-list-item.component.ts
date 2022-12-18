import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post.interface'

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.pug',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input() post!: Post

  constructor() { }

  ngOnInit(): void {
  }

}
