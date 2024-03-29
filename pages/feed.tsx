import { Box, styled, Typography } from '@mui/material'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ArticleItem from 'src/components/blocks/ArticleItem'
import useSelector from 'src/hooks/useSelector'
import { FetchingState } from 'src/types'
import { getArticles } from 'src/store/actions/feed'
import FeedPageSkeleton from 'src/components/skeletons/FeedPage'

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const FeedPage: NextPage = () => {
  const data = useSelector((store) => store.feed.modes.monthly.pages[1])
  const fetchingState = useSelector((store) => store.feed.modes.monthly.state)
  const fetchingError = useSelector(
    (store) => store.feed.modes.monthly.fetchError
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (fetchingState === FetchingState.Idle) {
      dispatch(
        getArticles({
          mode: 'monthly',
          page: 1,
          flow: 'all',
        })
      )
    }
  }, [fetchingState, dispatch])

  return (
    <Root>
      {fetchingState === FetchingState.Fetching && <FeedPageSkeleton />}
      {fetchingState === FetchingState.Error && (
        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.error.main }}
        >
          Error: {fetchingError.message}
        </Typography>
      )}
      {fetchingState === FetchingState.Fetched &&
        data.publicationIds.map((e) => (
          <ArticleItem data={data.publicationRefs[e]} key={e} />
        ))}
    </Root>
  )
}

export default FeedPage
