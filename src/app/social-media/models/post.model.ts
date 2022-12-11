import {Comment} from '../../shared/models/comment.model'

export interface Post {
  id: number
  userId: number
  title: string
  createdDate: string
  content: string
  comments: Comment[]
  imageUrl: string
}

export interface PostCommented {
  comment: string,
  postId: number
}
