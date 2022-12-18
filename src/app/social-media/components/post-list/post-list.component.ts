import { ActivatedRoute } from '@angular/router'
import { map, Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post.interface'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.pug',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public posts$!: Observable<Post[]>

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    )
  }

}
