import { Comment } from './Comment'

export default interface Comments {
  comments: Comment[]
  threads: string[]
  commentAccess: {
    isCanComment: boolean
    cantCommentReasonKey?: string
    cantCommentReason?: string
  }
  lastCommentTimestamp: number
  moderated: never
}

export type APIResponseComments = Omit<Comments, 'comments'> & {
  comments: Record<string, Comment>
}
