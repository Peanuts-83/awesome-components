import { AnimationStateMetadata, state, style, AnimationTransitionMetadata, transition, animate, query, animateChild, stagger } from "@angular/animations"

// animation states & transitions des listItems//
export const animDefault: AnimationStateMetadata =
  state('default', style({ backgroundColor: 'white', color: 'black', transform: 'scale(1)', 'z-index': 1 }))
export const animActive: AnimationStateMetadata =
  state('active', style({ backgroundColor: 'rgb(73, 27, 103)', color: 'white', transform: 'scale(1.2)', 'z-index': 2 })
  )
export const transitionIn: AnimationTransitionMetadata = transition('default => active', [
  animate('200ms ease-in-out')
])
export const transitionOut: AnimationTransitionMetadata = transition('active => default', [
  animate('500ms ease-in-out')
])

// void => * === :enter
export const transitionNew: AnimationTransitionMetadata = transition('void => *', [
  query('.text, .date', [
    style({ opacity: 0 })
  ]),
  style({
    transform: 'translateX(-100%)',
    opacity: 0,
    backgroundColor: 'rgb(73, 27, 103)'
  }),
  animate('250ms ease-in-out',
    style({
      transform: 'translateX(0)',
      opacity: 1,
      backgroundColor: 'white'
    })),
  query('.text', [
    style({opacity: 0}),
    animate('250ms', style({ opacity: 1 }))
  ]),
  query('.date', [
    style({opacity: 0}),
    animate('500ms', style({ opacity: 1 }))
  ])
])

// decalage dans le temps
export const delayTime: AnimationTransitionMetadata =
  transition(':enter', [
    query('@listItem', [
      stagger(100, [animateChild()])
    ])
  ])
