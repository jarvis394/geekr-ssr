import FetchingState from 'src/types/FetchingState'
import { AxiosError } from 'axios'
import { Article } from 'src/types'
import Comments from 'src/types/Comments'

export const PREFIX = 'ARTICLE_'
export const ARTICLE_FETCH = PREFIX + 'FETCH'
export const ARTICLE_FETCH_FULFILLED = PREFIX + 'FETCH_FULFULLED'
export const ARTICLE_FETCH_REJECTED = PREFIX + 'FETCH_REJECTED'
export const ARTICLE_COMMENTS_FETCH = PREFIX + 'COMMENTS_FETCH'
export const ARTICLE_COMMENTS_FETCH_FULFILLED = PREFIX + 'COMMENTS_FETCH_FULFULLED'
export const ARTICLE_COMMENTS_FETCH_REJECTED = PREFIX + 'COMMENTS_FETCH_REJECTED'

interface StoreFetchingState<T> {
  [key: string]: unknown
  state: FetchingState
  fetchError: AxiosError
  lastUpdated: number
  data: T
}

export interface State {
  article: StoreFetchingState<Article>
  comments: StoreFetchingState<Comments>
}
