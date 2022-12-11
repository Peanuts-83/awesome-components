import { PostCommented } from './../models/post.model'
import { environment } from './../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Post } from '../models/post.model'

@Injectable()
export class PostsService {

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiUrl + '/posts')
  }
  public addNewComment(postComment: PostCommented): void {
    console.log(postComment);

  }

  constructor(private http:HttpClient) { }
}
