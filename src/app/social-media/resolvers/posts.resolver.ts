import { PostsService } from './../services/posts.service'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Injectable } from "@angular/core"
import { Post } from 'src/app/shared/models/post.interface'
import { Observable } from 'rxjs'


@Injectable()
export class PostsResolver implements Resolve<Post[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.postsService.getPosts()
  }

  constructor(private postsService: PostsService) {}

}
