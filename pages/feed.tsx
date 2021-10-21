import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useSelector from 'src/hooks/useSelector'
import { FetchingState } from 'src/interfaces'
import { getArticles } from 'src/store/actions/feed'

const FeedPage = () => {
  const data = useSelector((store) => store.feed.modes.daily.pages[1])
  const fetchingState = useSelector((store) => store.feed.modes.daily.state)
  const fetchingError = useSelector(
    (store) => store.feed.modes.daily.fetchError
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      fetchingState === FetchingState.Idle ||
      fetchingState === FetchingState.Error
    ) {
      dispatch(
        getArticles({
          mode: 'daily',
          page: 1,
          flow: 'all',
        })
      )
    }
  }, [fetchingState])

  // console.log(data)

  return (
    <div>
      {fetchingState === FetchingState.Fetched &&
        data.articleIds.map((e) => (
          <Typography key={e}>{data.articleRefs[e].titleHtml}</Typography>
        ))}
    </div>
  )
}

export default FeedPage
