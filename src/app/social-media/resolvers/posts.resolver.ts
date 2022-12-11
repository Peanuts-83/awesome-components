import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { Post } from "../models/post.model"
import { PostsService } from "../services/posts.service"

@Injectable()
export class PostsResolver implements Resolve<Post[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Post[] | Observable<Post[]> | Promise<Post[]> {
    return this.postsService.getPosts()
  }

  constructor(private postsService: PostsService) {}
}
