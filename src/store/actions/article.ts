import * as api from 'src/api'
import shouldUpdate from 'src/utils/shouldUpdate'
import { RootState } from '..'
import {
  ARTICLE_FETCH,
  ARTICLE_FETCH_FULFILLED,
  ARTICLE_FETCH_REJECTED,
} from 'src/store/reducers/article/types'

interface GetArticleParams {
  id: number
  forceUpdate?: boolean
}

export const getArticle =
  (params: GetArticleParams) => async (dispatch, getState: () => RootState) => {
    const { id, forceUpdate = false } = params
    // Get data from root store to find out if we're going to fetch a data or not
    const storeState = getState()
    const storeData = storeState.article.article

    if (!shouldUpdate(storeData) && !forceUpdate) {
      return Promise.resolve()
    }

    dispatch({ type: ARTICLE_FETCH })

    try {
      const data = await api.article.get({ id })

      dispatch({
        type: ARTICLE_FETCH_FULFILLED,
        payload: { data },
      })
    } catch (error) {
      dispatch({
        type: ARTICLE_FETCH_REJECTED,
        payload: { data: error },
      })
    }
  }
