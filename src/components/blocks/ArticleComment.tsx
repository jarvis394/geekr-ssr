import {
  styled,
  Typography,
  lighten,
  darken,
  Theme,
  Box,
  ButtonBase,
  IconButton,
  alpha,
} from '@mui/material'
import dayjs from 'dayjs'
import React, { ComponentProps, useState } from 'react'
import FormattedText from 'src/components/formatters/FormattedText'
import useSelector from 'src/hooks/useSelector'
import { Comment } from 'src/types/Comment'
import isDarkTheme from 'src/utils/isDarkTheme'
import UserAvatar from './UserAvatar'
import VisibilitySensor from 'react-visibility-sensor'
import { LAZY_LOAD_VISIBILITY_THRESHOLD } from 'src/config/constants'
import { Icon24ChevronDown, Icon24ChevronUp } from '@vkontakte/icons'
import formatScore from 'src/utils/formatScore'

type ArticleCommentProps = {
  data: Comment
} & ComponentProps<'div'>

const GAP_WIDTH = 18

const getBorderColor = (theme: Theme) => {
  if (isDarkTheme(theme)) {
    return lighten(theme.palette.background.default, 0.1)
  } else {
    return darken(theme.palette.background.default, 0.12)
  }
}

const Root = styled('section', { shouldForwardProp: (p) => p !== 'isThread' })<{
  isThread: boolean
}>(({ theme, isThread }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(1.5),
  ...(isThread && {
    marginTop: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    borderBottom: '1px solid ' + theme.palette.divider,
  }),
}))
const Content = styled('article', {
  shouldForwardProp: (p) => p !== 'isThread',
})<{
  isThread: boolean
}>(({ theme, isThread }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(0, 2, 0, 0),
  ...(isThread && {
    padding: theme.spacing(0, 2),
  }),
}))
const Branch = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,
  contentVisibility: 'auto',
  width: GAP_WIDTH,
  borderLeft: '1px solid ' + getBorderColor(theme),
  marginTop: 8,
  ['&:hover']: {
    borderColor: theme.palette.primary.main + ' !important',
    borderWidth: '2px' + ' !important',
  },
}))
const Children = styled('div', { shouldForwardProp: (p) => p !== 'isThread' })<{
  isThread: boolean
}>(({ theme, isThread }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  ...(isThread && {
    marginLeft: theme.spacing(1.5),
  }),
}))
const AuthorContainerOffset = styled('div')(({ theme }) => ({
  height: 26,
}))
const AuthorContainer = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  contentVisibility: 'auto',
  'contain-intrinsic-size': '0 26px',
  contain: 'strict',
}))
const StyledUserAvatar = styled(UserAvatar)(({ theme }) => ({
  width: 26,
  height: 26,
  borderRadius: 4,
  background: theme.palette.background.paper,
}))
const AliasAndTimestampContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(1),
}))
const AuthorAlias = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 600,
  fontSize: 13,
  color: theme.palette.primary.main,
  lineHeight: '15px',
}))
const Timestamp = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: 10,
  color: theme.palette.text.secondary,
  lineHeight: '11px',
}))
const BottomRow = styled('footer')(({ theme }) => ({
  display: 'flex',
  marginTop: 8,
  marginBottom: 4,
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 24,
}))
const ReplyButton = styled('button')(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.text.secondary,
  padding: 0,
  borderRadius: 24,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  height: '100%',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))
const ScoreContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
  gap: theme.spacing(0.5),
}))
const ScoreLabel = styled('span')(({ theme }) => ({
  fontWeight: 900,
  fontFamily: 'Google Sans',
  color: theme.palette.text.primary,
  background: alpha(theme.palette.text.primary, 0.12),
  minWidth: 32,
  height: '100%',
  padding: theme.spacing(0, 1),
  fontSize: 14,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
const StyledFormattedText = styled(FormattedText)(({ theme }) => ({
  fontSize: 15,
  marginTop: theme.spacing(0.5),
  overflowWrap: 'anywhere',
}))

const Score: React.FC<{ score: Comment['score'] }> = ({ score }) => {
  const { number, state } = formatScore(score)

  return (
    <ScoreLabel
      sx={{
        ...(state === 'positive' && {
          background: (theme) => alpha(theme.palette.success.main, 0.12),
          color: (theme) => theme.palette.success.main,
        }),
        ...(state === 'negative' && {
          background: (theme) => alpha(theme.palette.error.main, 0.12),
          color: (theme) => theme.palette.error.main,
        }),
      }}
    >
      {number}
    </ScoreLabel>
  )
}

const ArticleComment: React.FC<ArticleCommentProps> = ({
  data,
  className,
  ...props
}) => {
  const formattedTimePublished = dayjs(data.timePublished).format(
    'DD.MM.YYYY [в] HH:mm'
  )
  const storeComments = useSelector(
    (store) => store.article.comments.data.comments
  )
  const [isCollapsed, setCollapsed] = useState(false)
  const [isVisible, setVisible] = useState(false)
  const handleBranchClick = () => {
    setCollapsed(true)
  }
  const handleCollapsedClick = () => {
    setCollapsed(false)
  }
  const handleCommentVisibilityChange = (newIsVisible: boolean) => {
    setVisible(newIsVisible)
  }

  return (
    <Root isThread={data.level === 0} {...props}>
      <VisibilitySensor
        partialVisibility
        offset={{
          top: LAZY_LOAD_VISIBILITY_THRESHOLD,
          bottom: LAZY_LOAD_VISIBILITY_THRESHOLD,
        }}
        onChange={handleCommentVisibilityChange}
      >
        <Content isThread={data.level === 0}>
          {data.author && (
            <>
              {isVisible && (
                <AuthorContainer>
                  <StyledUserAvatar
                    alias={data.author.alias}
                    src={data.author.avatarUrl}
                  />
                  <AliasAndTimestampContainer>
                    <AuthorAlias>{data.author.alias}</AuthorAlias>
                    <Timestamp>{formattedTimePublished}</Timestamp>
                  </AliasAndTimestampContainer>
                </AuthorContainer>
              )}
              {!isVisible && <AuthorContainerOffset />}
              <StyledFormattedText>{data.message}</StyledFormattedText>
              <BottomRow>
                {isVisible && (
                  <>
                    <ReplyButton>Ответить</ReplyButton>
                    <ScoreContainer>
                      <IconButton
                        size="small"
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <Icon24ChevronDown width={24} height={24} />
                      </IconButton>
                      <Score score={data.score} />
                      <IconButton
                        size="small"
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <Icon24ChevronUp width={24} height={24} />
                      </IconButton>
                    </ScoreContainer>
                  </>
                )}
              </BottomRow>
            </>
          )}
          {!data.author && <FormattedText>НЛО прилетело здесь</FormattedText>}
        </Content>
      </VisibilitySensor>
      {isCollapsed && (
        <button onClick={handleCollapsedClick}>Развернуть ветку</button>
      )}
      {!isCollapsed && data.children.length != 0 && (
        <Children isThread={data.level === 0}>
          <Branch onClick={handleBranchClick} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {data.children.map((e) => (
              <ArticleComment key={e} data={storeComments[e]} />
            ))}
          </Box>
        </Children>
      )}
    </Root>
  )
}

export default React.memo(ArticleComment)
