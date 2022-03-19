import { Profile } from './Profile'

interface CommentBranch {
  hidden?: boolean
  noBorder?: boolean
  parentId: string
  childrenIds: string[]
}

export interface Comment {
  /** Generated at comments parsing */
  // isLastInThread?: boolean
  // isNewLevel?: boolean
  // isSubthreadStart?: boolean
  // threadLevel?: number
  // hiddenBranches?: Set<number>
  // branches?: CommentBranch[]
  // childrenIds?: string[]

  id: string
  parentId: string
  level: number
  timePublished: string
  timeChanged: string
  isSuspended: boolean
  score: number
  votesCount: number
  message: string
  author: Profile
  isAuthor: boolean
  isFavorite: boolean
  vote: {
    value: null | number
    isCanVote: boolean
  }
  isPostAuthor: boolean
  isCanEdit: boolean
  timeEditAllowedTill: string | Date | null
  // children: Comment[]
  children: string[]
  isNew: false
}
