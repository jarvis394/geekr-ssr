import * as api from 'src/api'
import shouldUpdate from 'src/utils/shouldUpdate'
import { RootState } from '..'
import {
  ARTICLE_COMMENTS_FETCH,
  ARTICLE_COMMENTS_FETCH_FULFILLED,
  ARTICLE_COMMENTS_FETCH_REJECTED,
  ARTICLE_COMMENTS_HIGHLIGHT,
  ARTICLE_FETCH,
  ARTICLE_FETCH_FULFILLED,
  ARTICLE_FETCH_REJECTED,
} from 'src/store/reducers/article/types'
import { createBranches, flatten, parseComments } from 'src/utils/commentsUtils'

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

/**
 * Gets post comments and dispatches the data to the `post` store
 * @param id Post ID
 */
export const getArticleComments = (id: number | string) => async (dispatch) => {
  dispatch({ type: ARTICLE_COMMENTS_FETCH })

  try {
    const data = await api.article.getComments(id)
    // const parsedComments = parseComments(data.comments)
    // const flattenComments = flatten(parsedComments)
    // const comments = createBranches(flattenComments)

    dispatch({
      type: ARTICLE_COMMENTS_FETCH_FULFILLED,
      payload: {
        data,
      },
    })
  } catch (error) {
    dispatch({
      type: ARTICLE_COMMENTS_FETCH_REJECTED,
      payload: (error as Error).message,
    })
  }
}

export const highlightBranch =
  (id: string, add: boolean) => async (dispatch) => {
    dispatch({
      type: ARTICLE_COMMENTS_HIGHLIGHT,
      payload: {
        id,
        add,
      },
    })
  }
