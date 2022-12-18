import { PostsResolver } from './resolvers/posts.resolver'
import { SharedModule } from './../shared/shared.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostsService } from './services/posts.service';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component'


@NgModule({
  declarations: [
    PostListComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule,
  ],
  providers: [
    PostsService,
    PostsResolver,
  ]
})
export class SocialMediaModule { }
