import { styled, Typography, alpha, Divider, Box, Link } from '@mui/material'
import React from 'react'
import { ARTICLE_IMAGE_HEIGHT } from 'src/config/constants'
import { Article } from 'src/types'
import parsePreviewTextHtml from 'src/utils/parsePreviewTextHtml'
import getArticleLink from 'src/utils/getArticleLink'
import LazyImage from './LazyImage'
import dayjs from 'dayjs'
import formatViewCount from 'src/utils/formatViewsCount'
import UserAvatar from './UserAvatar'
import RouterLink from 'src/components/elements/Link'
import { Icon24Comment } from '@vkontakte/icons'
import formatWordByNumber from 'src/utils/formatWordByNumber'
import isDarkTheme from 'src/utils/isDarkTheme'

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
  }
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

const TimestampContainer = styled('div', {
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
}))

const CommentsContainer = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: alpha(theme.palette.text.primary, 0.75),
}))

const CommentsText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontSize: 15,
  fontWeight: 700,
}))

const AuthorContainer = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
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

const Label = styled('div')(({ theme }) => ({
  borderRadius: 8,
  fontFamily: 'Google Sans',
  fontWeight: 500,
  fontSize: 14,
  height: 24,
  padding: theme.spacing(0, 1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '24px',
}))

const TechnotextLabel: React.FC<{ label: string; link: string }> = ({
  link,
  label,
}) => {
  return (
    <Link
      href={link}
      underline="none"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Label
        sx={{
          background: '#7B61FF',
          color: '#FFFFFF',
        }}
      >
        {label}
      </Label>
    </Link>
  )
}

const RecoveryLabel = () => {
  return (
    <Label
      sx={{
        background: '#D8804F',
        color: '#FFFFFF',
      }}
    >
      Recovery
    </Label>
  )
}

const TutorialLabel = () => {
  return (
    <Label
      sx={{
        background: '#6171FF',
        color: '#FFFFFF',
      }}
    >
      Туториал
    </Label>
  )
}

const TranslationLabel = () => {
  return (
    <Label
      sx={{
        background: '#88B4FF',
        color: '#000000',
      }}
    >
      Из песочницы
    </Label>
  )
}

const SandboxLabel = () => {
  return (
    <Label
      sx={{
        background: '#f2f2f2',
        color: alpha('#000000', 0.75),
      }}
    >
      Из песочницы
    </Label>
  )
}

const ScoreLabel: React.FC<{ score: number }> = ({ score }) => {
  const positiveBackgroundColor = '#64ea58'
  const positiveColor = alpha('#000000', 0.8)
  const normalBackgroundColor = '#404040'
  const normalColor = '#ffffff'
  const negativeBackgroundColor = '#FA5D51'
  const negativeColor = '#ffffff'
  const scorePrefix = React.useMemo(() => (score > 0 ? '+' : ''), [score])
  return (
    <Label
      sx={{
        ...(score === 0 && {
          background: normalBackgroundColor,
          color: normalColor,
        }),
        ...(score > 0 && {
          background: positiveBackgroundColor,
          color: positiveColor,
        }),
        ...(score < 0 && {
          background: negativeBackgroundColor,
          color: negativeColor,
        }),
        fontWeight: 700,
      }}
    >
      {scorePrefix}
      {score}
    </Label>
  )
}

const ArticleItem: React.FC<{ data: Article }> = ({ data }) => {
  const hasImage = React.useMemo(() => !!data.leadImage, [data.leadImage])
  const parsedPreviewText = parsePreviewTextHtml(data.leadData.textHtml)
  const articleLink = getArticleLink(data)
  const timestamp = dayjs(data.timePublished).calendar()
  const views = formatViewCount(data.statistics.readingCount)
  const commentsText = formatWordByNumber(data.statistics.commentsCount, [
    'комментарий',
    'комментария',
    'комментариев',
  ])
  const labelsToComponentsMap = {
    tutorial: (key: number) => <TutorialLabel key={key} />,
    translation: (key: number) => <TranslationLabel key={key} />,
    sandbox: (key: number) => <SandboxLabel key={key} />,
    recovery: (key: number) => <RecoveryLabel key={key} />,
    technotext2020: (key: number) => (
      <TechnotextLabel
        link={
          'https://contenting.io/challenge.html?utm_source=habr&utm_medium=label'
        }
        label={'🔥 Технотекст 2020'}
        key={key}
      />
    ),
    technotext2021: (key: number) => (
      <TechnotextLabel
        link={'https://contenting.io/2021.html'}
        label={'🔥 Технотекст 2021'}
        key={key}
      />
    ),
  }

  return (
    <Root component={'article'}>
      <LabelsContainer hasImage={hasImage}>
        <ScoreLabel score={data.statistics.score} />
        {data.postLabels.map((e, i) => labelsToComponentsMap[e.type](i))}
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
        {timestamp}
        <Bullet />
        {views}
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
          <CommentsText>{data.statistics.commentsCount}</CommentsText>
        </CommentsContainer>
      </BottomRowContainer>
      <Divider />
    </Root>
  )
}

export default React.memo(ArticleItem)
