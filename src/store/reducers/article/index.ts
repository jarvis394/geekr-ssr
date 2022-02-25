import { AxiosError } from 'axios'
import FetchingState from 'src/types/FetchingState'
import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_FULFILLED,
  ARTICLE_FETCH_REJECTED,
  State,
} from './types'
import { HYDRATE } from 'next-redux-wrapper'
import produce from 'immer'
import { Article } from 'src/types'

type FetchFulfulledPayload = {
  data: Article
}
type FetchRejectedPayload = { data: AxiosError }

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

export default produce((draft, { type, payload }) => {
  switch (type) {
    case HYDRATE: {
      draft = payload
      break
    }
    case ARTICLE_FETCH: {
      draft.article.state = FetchingState.Fetching
      draft.article.data = null
      draft.article.lastUpdated = null
      draft.article.fetchError = null
      break
    }
    case ARTICLE_FETCH_FULFILLED: {
      const { data } = payload as FetchFulfulledPayload

      draft.article.state = FetchingState.Fetched
      draft.article.lastUpdated = Date.now()
      draft.article.data = data
      draft.article.fetchError = null
      break
    }
    case ARTICLE_FETCH_REJECTED: {
      const { data } = payload as FetchRejectedPayload
      draft.article.state = FetchingState.Fetched
      draft.article.lastUpdated = null
      draft.article.data = null
      draft.article.fetchError = data
      break
    }
    default:
      break
  }
}, initialState)
