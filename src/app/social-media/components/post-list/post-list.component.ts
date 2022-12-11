
import { PostCommented } from './../../models/post.model'
import { PostsService } from './../../services/posts.service'
import { map, Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { Post } from '../../models/post.model'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.pug',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  public posts$!: Observable<Post[]>

  constructor(private route: ActivatedRoute,
    private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    )
  }

  public onPostComment(postComment: PostCommented) {
    this.postsService.addNewComment(postComment)
  }

}
