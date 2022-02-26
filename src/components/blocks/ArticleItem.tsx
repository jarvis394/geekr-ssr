import {
  styled,
  Typography,
  alpha,
  Divider,
  Box,
  IconButton,
} from '@mui/material'
import React from 'react'
import { ARTICLE_IMAGE_HEIGHT } from 'src/config/constants'
import { Article } from 'src/types'
import parsePreviewTextHtml from 'src/utils/parsePreviewTextHtml'
import getArticleLink from 'src/utils/getArticleLink'
import LazyImage from './LazyImage'
import dayjs from 'dayjs'
import UserAvatar from './UserAvatar'
import RouterLink from 'src/components/elements/Link'
import { Icon24Comment } from '@vkontakte/icons'
import isDarkTheme from 'src/utils/isDarkTheme'
import ArticleLabel from '../elements/ArticleLabel'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import formatNumber from 'src/utils/formatNumber'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  '& a': {
    WebkitTapHighlightColor: alpha(
      theme.palette.background[isDarkTheme(theme) ? 'default' : 'paper'],
      0.3
    ),
  },
}))

const Title = styled(RouterLink)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  fontSize: 20,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  lineHeight: 1.35,
}))

const PreviewText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 400,
  color: alpha(theme.palette.text.primary, 0.75),
  marginBottom: theme.spacing(1.5),
  fontSize: 15,
  lineHeight: 1.45,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 6,
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
}))

const LeadImage = styled(LazyImage)(({ theme }) => ({
  width: '100%',
  height: ARTICLE_IMAGE_HEIGHT,
  borderRadius: 0,
  '& img': {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
}))

const TimestampContainer = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'hasImage',
})<{ hasImage: boolean }>(({ theme, hasImage }) => ({
  display: 'flex',
  flexDirection: 'row',
  color: alpha(theme.palette.text.primary, 0.5),
  fontFamily: 'Google Sans',
  fontSize: 13,
  fontWeight: 500,
  padding: theme.spacing(0, 2),
  marginTop: theme.spacing(hasImage ? 1.5 : 0.75),
  marginBottom: theme.spacing(0.5),
}))

const Bullet = styled('span')(({ theme }) => ({
  margin: theme.spacing(0, 0.75),
  '&::before': {
    content: '"•"',
  },
}))

const BottomRowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}))

const CommentsContainer = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: alpha(theme.palette.text.primary, 0.75),
  overflow: 'hidden',
}))

const CommentsText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontSize: 15,
  fontWeight: 700,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}))

const AuthorContainer = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexShrink: 0,
}))

const AuthorAvatar = styled(UserAvatar)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: 4,
}))

const AuthorAlias = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontSize: 15,
  fontWeight: 700,
  color: theme.palette.primary.main,
}))

const LabelsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hasImage',
})<{ hasImage: boolean }>(({ theme, hasImage }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  ...(hasImage && {
    position: 'absolute',
    zIndex: 10,
    top: theme.spacing(1),
    left: theme.spacing(1),
  }),
  ...(!hasImage && {
    position: 'relative',
    marginTop: theme.spacing(1.75),
    marginLeft: theme.spacing(2),
  }),
}))

const FavoriteIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 5,
  padding: theme.spacing(1.5),
  color: alpha(theme.palette.text.primary, 0.35),
}))

const ArticleItem: React.FC<{ data: Article }> = ({ data }) => {
  const hasImage = React.useMemo(() => !!data.leadImage, [data.leadImage])
  const parsedPreviewText = parsePreviewTextHtml(data.leadData.textHtml)
  const articleLink = getArticleLink(data)
  const timestampText = dayjs(data.timePublished).calendar()
  const viewsText = formatNumber(data.statistics.readingCount, [
    'просмотр',
    'просмотра',
    'просмотров',
  ])
  const commentsText = formatNumber(data.statistics.commentsCount)

  return (
    <Root component={'article'}>
      <FavoriteIconButton>
        <BookmarkBorderOutlinedIcon />
      </FavoriteIconButton>
      <LabelsContainer hasImage={hasImage}>
        <ArticleLabel variant="score" score={data.statistics.score} />
        {data.postLabels.map((e, i) => (
          <ArticleLabel variant={e.type} key={i} />
        ))}
      </LabelsContainer>
      {hasImage && (
        <RouterLink
          href={articleLink}
          sx={{
            display: 'flex',
          }}
        >
          <LeadImage disableZoom src={data.leadImage} />
        </RouterLink>
      )}
      <TimestampContainer hasImage={hasImage}>
        {timestampText}
        <Bullet />
        {viewsText}
      </TimestampContainer>
      <Title href={articleLink} variant="h1">
        {data.titleHtml}
      </Title>
      <PreviewText>{parsedPreviewText}</PreviewText>
      <BottomRowContainer>
        <AuthorContainer href={'/user/' + data.author.alias}>
          <AuthorAvatar alias={data.author.alias} src={data.author.avatarUrl} />
          <AuthorAlias>{data.author.alias}</AuthorAlias>
        </AuthorContainer>
        <CommentsContainer href={'/comments/'}>
          <Icon24Comment width={20} height={20} />
          <CommentsText>{commentsText}</CommentsText>
        </CommentsContainer>
      </BottomRowContainer>
      <Divider />
    </Root>
  )
}

export default React.memo(ArticleItem)
