import FetchingState from 'src/interfaces/FetchingState'
import { AxiosError } from 'axios'
import ArticlesResponse from 'src/interfaces/ArticlesResponse'

export const PREFIX = 'FEED_'
export const FEED_FETCH = PREFIX + 'FETCH'
export const FEED_FETCH_FULFILLED = PREFIX + 'FETCH_FULFULLED'
export const FEED_FETCH_REJECTED = PREFIX + 'FETCH_REJECTED'

export interface StateMode {
  state: FetchingState
  fetchError: AxiosError
  pages: Record<
    number,
    Omit<ArticlesResponse, 'pagesCount'> & { lastUpdated: number }
  >
  pagesCount: number
  lastUpdated: number
}

export interface State {
  modes: {
    all: StateMode
    top0: StateMode
    top10: StateMode
    top25: StateMode
    top50: StateMode
    top100: StateMode
    daily: StateMode
    weekly: StateMode
    monthly: StateMode
    yearly: StateMode
    alltime: StateMode
  }
}
