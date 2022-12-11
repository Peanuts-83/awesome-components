import { animate, AnimationStateMetadata, AnimationTransitionMetadata, state, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Comment } from '../../models/comment.model'
import { animActive, animDefault, transitionIn, transitionOut, transitionNew, delayTime } from '../../animations/comments.animation'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.pug',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      animDefault,
      animActive,
      transitionIn,
      transitionOut,
      transitionNew,
    ]),
    trigger('list', [
      delayTime,
    ])
  ]
})
export class CommentsComponent implements OnInit {
  public animationStates: { [key: string]: 'default' | 'active' } = {}
  public onListItemMouseEnter(id: number) { this.animationStates[id] = 'active' }
  public onListItemMouseLeave(id: number) { this.animationStates[id] = 'default' }

  @Input() comments!: Comment[]
  @Output() newComment: EventEmitter<string> = new EventEmitter<string>()
  public commentCtrl!: FormControl

  public onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return
    }
    const maxId = Math.max(...this.comments.map(c => c.id))
    this.comments.unshift({
      id: maxId + 1,
      userId: 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString()
    })
    this.newComment.emit(this.commentCtrl.value)
    this.commentCtrl.reset()
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.fb.control('', [Validators.required, Validators.minLength(10)])
    for (let index in this.comments) {
      this.animationStates[index] = 'default'
    }

  }

}
