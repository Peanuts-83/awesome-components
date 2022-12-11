import { HighlightDirective } from './directives/highlight.directive'
import { TimeAgoPipe } from './pipes/timeAgo.pipe'
import { FullNamePipe } from './pipes/fullName.pipe'
import { ShortenPipe } from './pipes/shorten.pipe'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CommentsComponent } from './components/comments/comments.component'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    FullNamePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    CommentsComponent,
    ShortenPipe,
    FullNamePipe,
    TimeAgoPipe,
    HighlightDirective
  ]
})
export class SharedModule {}
