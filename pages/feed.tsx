import { Box, styled, Typography } from '@mui/material'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ArticleItem from 'src/components/blocks/ArticleItem'
import useSelector from 'src/hooks/useSelector'
import { FetchingState } from 'src/interfaces'
import { getArticles } from 'src/store/actions/feed'

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const FeedPage: NextPage = () => {
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
  }, [fetchingState, dispatch])

  return (
    <Root>
      {fetchingState === FetchingState.Fetching && (
        <Typography variant="body1">Fetching...</Typography>
      )}
      {fetchingState === FetchingState.Error && (
        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.error.main }}
        >
          Error: {fetchingError.message}
        </Typography>
      )}
      {fetchingState === FetchingState.Fetched &&
        data.articleIds.map((e) => (
          <ArticleItem data={data.articleRefs[e]} key={e} />
        ))}
    </Root>
  )
}

export default FeedPage
