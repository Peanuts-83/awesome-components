import { Component, Input, OnInit } from '@angular/core';
import {Comment} from '../../models/comment.interface'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.pug',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments!: Comment[]

  constructor() { }

  ngOnInit(): void {
  }

}
