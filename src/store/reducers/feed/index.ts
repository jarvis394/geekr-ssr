import { AxiosError } from 'axios'
import { AnyAction } from 'redux'
import { FEED_MODES } from 'src/config/constants'
import ArticlesResponse from 'src/interfaces/ArticlesResponse'
import { FeedMode } from 'src/interfaces/FeedMode'
import FetchingState from 'src/interfaces/FetchingState'
import {
  FEED_FETCH,
  FEED_FETCH_FULFILLED,
  FEED_FETCH_REJECTED,
  State,
  StateMode,
} from './types'
import { HYDRATE } from 'next-redux-wrapper'

type FetchPayload = { mode: FeedMode; page: number }
type FetchFulfulledPayload = {
  mode: FeedMode
  data: ArticlesResponse
  page: number
  pagesCount: number
}
type FetchRejectedPayload = { mode: FeedMode; data: AxiosError; page: number }

const initialModeState: StateMode = {
  fetchError: null,
  state: FetchingState.Idle,
  pages: {} as StateMode['pages'],
  pagesCount: null,
  lastUpdated: null,
}
const initialState: State = { modes: {} } as State
FEED_MODES.forEach((e) => (initialState.modes[e.mode] = initialModeState))

const feedStore = (
  state = initialState,
  { type, payload }: AnyAction
): State => {
  switch (type) {
    case HYDRATE: {
      return { ...state, ...payload }
    }

    case FEED_FETCH: {
      const { mode, page } = payload as FetchPayload
      state.modes[mode].state = FetchingState.Fetching
      state.modes[mode].pages[page] = null
      state.modes[mode].fetchError = null
      state.modes[mode].lastUpdated = null
      return state
    }

    case FEED_FETCH_FULFILLED: {
      const { mode, data, page, pagesCount } = payload as FetchFulfulledPayload
      state.modes[mode].state = FetchingState.Fetched
      state.modes[mode].pages[page] = {
        articleRefs: data.articleRefs,
        articleIds: data.articleIds,
      }
      state.modes[mode].pagesCount = pagesCount
      state.modes[mode].fetchError = null
      state.modes[mode].lastUpdated = Date.now()
      return state
    }

    case FEED_FETCH_REJECTED: {
      const { mode, data, page } = payload as FetchRejectedPayload
      state.modes[mode].state = FetchingState.Fetched
      state.modes[mode].fetchError = data
      state.modes[mode].pages[page] = null
      state.modes[mode].lastUpdated = null
      return state
    }

    default:
      return state
  }
}

export default feedStore
