import * as api from 'src/api'
import FlowAlias from 'src/interfaces/FlowAlias'
import shouldUpdate from 'src/utils/shouldUpdate'
import { RootState } from '..'
import {
  FEED_FETCH_FULFILLED,
  FEED_FETCH_REJECTED,
  FEED_FETCH,
} from 'src/store/reducers/feed/types'
import { FeedMode } from 'src/interfaces'

interface GetPostsParams {
  mode: FeedMode
  page: number
  flow: FlowAlias
  forceUpdate?: boolean
}

export const getArticles =
  ({ mode, page, flow, forceUpdate = false }: GetPostsParams) =>
  async (dispatch, getState: () => RootState) => {
    // Get data from root store to find out if we're going to fetch a data or not
    const storeState = getState()
    const storeData = storeState.feed.modes[mode].pages[page]
    // const authData = storeState.auth.authorizedRequestData
    // const storeData =
    //   flow === 'all'
    //     ? storeState.feed.data[mode].pages[page]
    //     : storeState.feed.flows.data[flow][mode].pages[page]

    if (!shouldUpdate(storeData) && !forceUpdate) {
      return Promise.resolve()
    }

    dispatch({ type: FEED_FETCH, payload: { mode, flow } })

    try {
      const data = await api.articles.get({ mode, page, flow })
      const pagesCount = data?.pagesCount

      dispatch({
        type: FEED_FETCH_FULFILLED,
        payload: { data, mode, page, pagesCount, flow },
      })
    } catch (error) {
      dispatch({
        type: FEED_FETCH_REJECTED,
        payload: { data: error, mode, page, flow },
      })
    }
  }
