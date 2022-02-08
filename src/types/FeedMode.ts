export interface FeedModeData {
  text: string
  to: string
  mode: FeedMode
  isModeForNewTab?: boolean
  switcherButtonLabel: string
}

export type FeedMode =
  | 'all'
  | 'top0'
  | 'top10'
  | 'top25'
  | 'top50'
  | 'top100'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'alltime'