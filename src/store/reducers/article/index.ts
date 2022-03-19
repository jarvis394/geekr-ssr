import { AxiosError } from 'axios'
import FetchingState from 'src/types/FetchingState'
import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_FULFILLED,
  ARTICLE_FETCH_REJECTED,
  ARTICLE_COMMENTS_FETCH,
  ARTICLE_COMMENTS_FETCH_FULFILLED,
  ARTICLE_COMMENTS_FETCH_REJECTED,
  ARTICLE_COMMENTS_HIGHLIGHT,
  State,
} from './types'
import { HYDRATE } from 'next-redux-wrapper'
import produce from 'immer'
import { Article } from 'src/types'
import Comments from 'src/types/Comments'

type ArticleFetchFulfulledPayload = {
  data: Article
}
type ArticleCommentsFetchFulfulledPayload = {
  data: Comments
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
  comments: { ...initialStoreFetchingState, highlightedId: null },
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
      const { data } = payload as ArticleFetchFulfulledPayload
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
    case ARTICLE_COMMENTS_FETCH: {
      draft.comments.state = FetchingState.Fetching
      draft.comments.data = null
      draft.comments.lastUpdated = null
      draft.comments.fetchError = null
      break
    }
    case ARTICLE_COMMENTS_FETCH_FULFILLED: {
      const { data } = payload as ArticleCommentsFetchFulfulledPayload
      draft.comments.state = FetchingState.Fetched
      draft.comments.data = data
      draft.comments.lastUpdated = Date.now()
      draft.comments.fetchError = null
      break
    }
    case ARTICLE_COMMENTS_FETCH_REJECTED: {
      const { data } = payload as FetchRejectedPayload
      draft.comments.state = FetchingState.Fetched
      draft.comments.lastUpdated = null
      draft.comments.data = null
      draft.comments.fetchError = data
      break
    }
    case ARTICLE_COMMENTS_HIGHLIGHT: {
      const { id, add } = payload
      draft.comments.highlightedId = add ? id : null
      break
    }
    default:
      break
  }
}, initialState)
