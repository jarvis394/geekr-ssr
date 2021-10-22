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

const initialState: State = { modes: {} } as State
FEED_MODES.forEach((e) => {
  initialState.modes[e.mode] = {
    fetchError: null,
    state: FetchingState.Idle,
    pages: {} as StateMode['pages'],
    pagesCount: null,
    lastUpdated: null,
  }
})

const feedStore = (
  state = initialState,
  { type, payload }: AnyAction
): State => {
  switch (type) {
    case HYDRATE: {
      return { ...state, ...payload.feed }
    }

    case FEED_FETCH: {
      const { mode, page } = payload as FetchPayload
      return {
        ...state,
        modes: {
          ...state.modes,
          [mode]: {
            state: FetchingState.Fetching,
            pages: {
              ...state.modes[mode].pages,
              [page]: null,
            },
            fetchError: null,
            lastUpdated: null,
          },
        },
      }
    }

    case FEED_FETCH_FULFILLED: {
      const { mode, data, page, pagesCount } = payload as FetchFulfulledPayload
      return {
        ...state,
        modes: {
          ...state.modes,
          [mode]: {
            ...state.modes[mode],
            state: FetchingState.Fetched,
            pages: {
              ...state.modes[mode].pages,
              [page]: {
                articleRefs: data.articleRefs,
                articleIds: data.articleIds,
              },
            },
            pagesCount: pagesCount,
            fetchError: null,
            lastUpdated: Date.now(),
          },
        },
      }
    }

    case FEED_FETCH_REJECTED: {
      const { mode, data, page } = payload as FetchRejectedPayload
      return {
        ...state,
        modes: {
          ...state.modes,
          [mode]: {
            state: FetchingState.Error,
            pages: {
              ...state.modes[mode].pages,
              [page]: null,
            },
            fetchError: data,
            lastUpdated: null,
          },
        },
      }
    }

    default:
      return state
  }
}

export default feedStore
