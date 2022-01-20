import { styled, Typography, alpha, Divider, Box } from '@mui/material'
import React from 'react'
import { ARTICLE_IMAGE_HEIGHT } from 'src/config/constants'
import { Article } from 'src/interfaces'
import parsePreviewTextHtml from 'src/utils/parsePreviewTextHtml'
import LazyImage from './LazyImage'
import dayjs from 'dayjs'
import numberToWordsRu from 'number-to-words-ru'
import formatViewCount from 'src/utils/formatViewsCount'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}))

const Title = styled(Typography)(({ theme }) => ({
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

const TimestampContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  color: alpha(theme.palette.text.primary, 0.5),
  fontFamily: 'Google Sans',
  fontSize: 13,
  fontWeight: 500,
  padding: theme.spacing(0, 2),
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
}))

const Bullet = styled('span')(({ theme }) => ({
  margin: theme.spacing(0, 0.75),
  '&::before': {
    content: '"•"',
  },
}))

const ArticleItem: React.FC<{ data: Article }> = ({ data }) => {
  const parsedPreviewText = parsePreviewTextHtml(data.leadData.textHtml)
  const timestamp = dayjs(data.timePublished).calendar()
  const views = formatViewCount(data.statistics.readingCount)

  return (
    <Root>
      {data.leadImage && <LeadImage src={data.leadImage} />}
      <TimestampContainer>
        {timestamp}
        <Bullet />
        {views}
      </TimestampContainer>
      <Title variant="h1">{data.titleHtml}</Title>
      <PreviewText>{parsedPreviewText}</PreviewText>
      <Divider />
    </Root>
  )
}

export default React.memo(ArticleItem)
