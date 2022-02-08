import { Profile } from './Profile'

export interface Comment {
  /** Generated on comments parsing */
  isLastInThread?: boolean
  isNewLevel?: boolean
  isThreadStart?: boolean
  threadLevel?: number

  id: number
  parentId: number
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
  children: Comment[]
  isNew: false
}
