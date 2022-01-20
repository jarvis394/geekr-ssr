import { AxiosError } from 'axios'
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
import produce from 'immer'
import getPostLeadImage from 'src/utils/getPostLeadImage'

type FetchPayload = { mode: FeedMode; page: number }
type FetchFulfilledPayload = {
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
export default produce((draft, { type, payload }) => {
  switch (type) {
    case HYDRATE: {
      draft = payload
      break
    }
    case FEED_FETCH: {
      const { mode, page } = payload as FetchPayload
      draft.modes[mode].state = FetchingState.Fetching
      draft.modes[mode].fetchError = null
      draft.modes[mode].lastUpdated = null
      draft.modes[mode].pages[page] = null
      break
    }
    case FEED_FETCH_FULFILLED: {
      const { mode, data, page, pagesCount } = payload as FetchFulfilledPayload

      for (const id in data.articleRefs) {
        data.articleRefs[id].leadImage = getPostLeadImage(
          data.articleRefs[id]
        )
      }

      draft.modes[mode].state = FetchingState.Fetched
      draft.modes[mode].pages[page] = {
        articleRefs: data.articleRefs,
        articleIds: data.articleIds,
        lastUpdated: Date.now()
      }
      draft.modes[mode].pagesCount = pagesCount
      draft.modes[mode].fetchError = null
      break
    }
    case FEED_FETCH_REJECTED: {
      const { mode, data, page } = payload as FetchRejectedPayload
      draft.modes[mode].state = FetchingState.Error
      draft.modes[mode].pages[page] = null
      draft.modes[mode].fetchError = data
      draft.modes[mode].lastUpdated = null
      break
    }
    default:
      break
  }
}, initialState)
