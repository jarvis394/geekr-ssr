export default interface Comments {
  comments: Map<number, Comment>
  threads: number[]
  commentAccess: {
    isCanComment: boolean
    cantCommentReasonKey?: string
    cantCommentReason?: string
  }
  lastCommentTimestamp: number
  moderated: never
}
