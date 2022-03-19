import { alpha, Box, styled, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'
import Header from 'src/components/blocks/Header'
import UserAvatar from 'src/components/blocks/UserAvatar'
import ArticleLabel from 'src/components/elements/ArticleLabel'
import Link from 'src/components/elements/Link'
import FormattedText from 'src/components/formatters/FormattedText'
import { APP_BAR_HEIGHT } from 'src/config/constants'
import useSelector from 'src/hooks/useSelector'
import { getArticle } from 'src/store/actions/article'
import { FetchingState } from 'src/types'

const Root = styled(Box)({
  width: '100%',
})
const TopContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0, 2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
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
  lineHeight: '2rem',
  wordBreak: 'break-word',
  color: theme.palette.text.primary,
}))
const LabelsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  position: 'relative',
}))
const HubsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',
}))
const Hub = styled(Link)(({ theme }) => ({
  position: 'relative',
  fontFamily: 'Roboto',
  fontSize: 14,
  lineHeight: '1.25rem',
  color: alpha(theme.palette.text.primary, 0.32),
  transitionDuration: theme.transitions.duration.shortest + 'ms',
  transitionTimingFunction: theme.transitions.easing.easeOut,
  WebkitTapHighlightColor: 'transparent',
  '&:hover': {
    color: theme.palette.primary.light,
  },
  '&:active::before': {
    opacity: 1,
  },
  '&::before': {
    content: '""',
    backgroundColor: alpha(theme.palette.primary.light, 0.12),
    borderRadius: 8,
    position: 'absolute',
    // Compensate for ::after ',' symbol
    width: `calc(100% + ${theme.spacing(1 * 2)} - 2.9px)`,
    height: `calc(100% + ${theme.spacing(0.5 * 2)})`,
    left: '-' + theme.spacing(1),
    top: '-' + theme.spacing(0.5),
    opacity: 0,
  },
  '&::after': {
    content: '", "',
    color: alpha(theme.palette.text.primary, 0.32) + ' !important',
  },
  '&:last-child::before': {
    width: `calc(100% + ${theme.spacing(1 * 2)})`,
  },
  '&:last-child::after': {
    content: '""',
  },
}))
const ArticleText = styled(FormattedText)(({ theme }) => ({
  padding: theme.spacing(0, 2),
}))

const Article = () => {
  const router = useRouter()
  const topContentContainerRef = useRef<HTMLDivElement>()
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
    if (
      fetchingState === FetchingState.Idle ||
      (data && articleId !== data.id)
    ) {
      dispatch(
        getArticle({
          id: Number(articleId),
        })
      )
    }
  }, [fetchingState, dispatch, articleId, data])

  return (
    <Root>
      <Header
        hidePositionBar={fetchingState !== FetchingState.Fetched}
        disableShrinking={fetchingState !== FetchingState.Fetched}
        scrollThreshold={topContentContainerRef.current?.scrollHeight}
      >
        {headerTitle}
      </Header>
      {fetchingState === FetchingState.Fetched && (
        <>
          <TopContentContainer ref={topContentContainerRef}>
            <AuthorContatiner>
              <StyledUserAvatar
                src={data.author.avatarUrl}
                alias={data.author.alias}
              />
              <AuthorAlias>{data.author.alias}</AuthorAlias>
              <Timestamp>{timestamp}</Timestamp>
            </AuthorContatiner>
            <Title>{data.titleHtml}</Title>
            <VisibilitySensor
              offset={{
                top: APP_BAR_HEIGHT,
                bottom: APP_BAR_HEIGHT,
              }}
              onChange={handleTitleVisibilityChange}
            >
              <LabelsContainer>
                <ArticleLabel variant="score" score={data.statistics.score} />
                {data.postLabels.map((e, i) => (
                  <ArticleLabel variant={e.type} key={i} />
                ))}
              </LabelsContainer>
            </VisibilitySensor>
            <HubsContainer>
              {data.hubs.map((e) => (
                <Hub href={'/hubs/' + e.alias} key={e.id}>
                  {e.title}
                </Hub>
              ))}
            </HubsContainer>
          </TopContentContainer>
          <Link href={location.pathname + '/comments'}>to comments</Link>
          <ArticleText>{data.textHtml}</ArticleText>
        </>
      )}
    </Root>
  )
}

export default Article
