import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from './material.module';
import { CommentsComponent } from './components/comments/comments.component'



@NgModule({
  declarations: [
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModules,
  ],
  exports: [
    MaterialModules,
    CommentsComponent,
  ]
})
export class SharedModule { }
