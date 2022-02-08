import { AxiosError } from 'axios'
import { AnyAction } from 'redux'
import ArticlesResponse from 'src/types/ArticlesResponse'
import { FeedMode } from 'src/types/FeedMode'
import FetchingState from 'src/types/FetchingState'
import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_FULFILLED,
  ARTICLE_FETCH_REJECTED,
  State,
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

const initialStoreFetchingState = {
  fetchError: null,
  state: FetchingState.Idle,
  data: null,
  lastUpdated: null,
}
const initialState: State = {
  article: initialStoreFetchingState,
  comments: initialStoreFetchingState,
}

const feedStore = (
  state = initialState,
  { type, payload }: AnyAction
): State => {
  switch (type) {
    case HYDRATE: {
      return { ...state, ...payload.article }
    }

    case ARTICLE_FETCH: {
      const { mode, page } = payload as FetchPayload
      return {
        ...state,
        
      }
    }

    case ARTICLE_FETCH_FULFILLED: {
      const { mode, data, page, pagesCount } = payload as FetchFulfulledPayload
      return {
        ...state,
        
      }
    }

    case ARTICLE_FETCH_REJECTED: {
      const { mode, data, page } = payload as FetchRejectedPayload
      return {
        ...state,
        
      }
    }

    default:
      return state
  }
}

export default feedStore
