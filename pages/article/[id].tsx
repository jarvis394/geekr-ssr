import { Box, styled, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'
import Header from 'src/components/blocks/Header'
import UserAvatar from 'src/components/blocks/UserAvatar'
import useSelector from 'src/hooks/useSelector'
import { getArticle } from 'src/store/actions/article'
import { FetchingState } from 'src/types'

const Root = styled(Box)({
  width: '100%',
  height: '200vh',
})
const TopContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0, 2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
}))
const AuthorContatiner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  alignItems: 'center',
}))
const StyledUserAvatar = styled(UserAvatar)(({ theme }) => ({
  width: 24,
  height: 24,
}))
const AuthorAlias = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 700,
  fontSize: 15,
  color: theme.palette.primary.main,
}))
const Timestamp = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 500,
  fontSize: 15,
  color: theme.palette.text.secondary,
}))
const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 700,
  fontSize: 24,
  color: theme.palette.text.primary,
}))

const Article = () => {
  const router = useRouter()
  const [headerTitle, setHeaderTitle] = useState<string>()
  const articleId = router.query.id
  const data = useSelector((store) => store.article.article.data)
  const fetchingState = useSelector((store) => store.article.article.state)
  const fetchingError = useSelector((store) => store.article.article.fetchError)
  const dispatch = useDispatch()
  const timestamp = data?.timePublished && dayjs(data.timePublished).calendar()
  const handleTitleVisibilityChange = (newIsVisible: boolean) => {
    setHeaderTitle(newIsVisible ? '' : data?.titleHtml)
  }

  useEffect(() => {
    if (fetchingState === FetchingState.Idle) {
      dispatch(
        getArticle({
          id: Number(articleId),
        })
      )
    }
  }, [fetchingState, dispatch, articleId])

  return (
    <Root>
      <Header scrollThreshold={160}>{headerTitle}</Header>
      {fetchingState === FetchingState.Fetched && (
        <TopContentContainer>
          <AuthorContatiner>
            <StyledUserAvatar
              src={data.author.avatarUrl}
              alias={data.author.alias}
            />
            <AuthorAlias>{data.author.alias}</AuthorAlias>
            <Timestamp>{timestamp}</Timestamp>
          </AuthorContatiner>
          <VisibilitySensor onChange={handleTitleVisibilityChange}>
            <Title>{data.titleHtml}</Title>
          </VisibilitySensor>
        </TopContentContainer>
      )}
    </Root>
  )
}

export default Article
