import { environment } from './../../../environments/environment.prod'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/models/post.interface'

@Injectable()
export class PostsService {

  public getPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
  }

  constructor(private http: HttpClient) { }
}
