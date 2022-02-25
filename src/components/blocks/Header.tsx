import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  IconButton,
  Box,
  NoSsr,
  Fade,
  Divider,
  SxProps,
  Theme,
} from '@mui/material'
import React, { useMemo } from 'react'
import { APP_BAR_HEIGHT } from 'src/config/constants'
import useScrollTrigger from 'src/hooks/useScrollTrigger'
import useDesktopMediaQuery from 'src/hooks/useDesktopMediaQuery'
import BackIcon from '@mui/icons-material/ArrowBackRounded'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

const UnmemoizedMountAnimation: React.FC<
  React.PropsWithChildren<{
    keyProp: React.Key
    sx?: SxProps<Theme>
  }>
> = ({ keyProp, children, sx }) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition<undefined>
        key={keyProp}
        addEndListener={(node: HTMLElement, done: () => void) => {
          node.addEventListener('transitionend', done, false)
        }}
        classNames="fade"
      >
        {/*
          We need div component because CSSTransition doesn't quite work
          on any other thing somewhy. If trigger changes quickly back and fourth,
          CSSTransition bugs on not removing exit state classes.
        */}
        <Box sx={sx}>{children}</Box>
      </CSSTransition>
    </SwitchTransition>
  )
}
export const MountAnimation = React.memo(UnmemoizedMountAnimation)

interface HeaderProps {
  // left?: React.ReactNode
  // right?: React.ReactNode
  // fixed?: boolean
  // backgroundColor?: string
  // shrinkedBackgroundColor?: string
  scrollThreshold?: number
  divider?: boolean
  disableShrinking?: boolean
  scrollElement?: HTMLElement
  hidePositionBar?: boolean
  children?: string | HTMLElement
}

interface AppBarStyleProps {
  isShrinked: boolean
  disableShrinking: boolean
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) =>
    !['isShrinked', 'disableShrinking'].some((e) => e === prop),
})<AppBarStyleProps>(({ theme, isShrinked, disableShrinking }) => ({
  background: theme.palette.background[isShrinked ? 'paper' : 'default'],
  boxShadow: 'none',
  color: theme.palette.text.primary,
  position: 'fixed',
  willChange: 'transform',
  flexGrow: 1,
  transform: `translateZ(0) translateY(${isShrinked ? -16 : 0}px)`,
  transition: disableShrinking
    ? 'none'
    : 'all .3s cubic-bezier(0.4, 0, 0.2, 1)',
}))
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  margin: 'auto',
  minHeight: 'unset',
  height: APP_BAR_HEIGHT,
  width: '100%',
  flexDirection: 'row',
  padding: 0,
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
}))
const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontSize: 20,
  height: '100%',
  alignItems: 'center',
  display: 'flex',
  letterHeight: '1.6',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  zIndex: 5,
  textOverflow: 'ellipsis',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1.5),
}))
const ShrinkedTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Google Sans',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  fontSize: 16,
  transform: `translateX(${theme.spacing(2)}) translateY(8px)`,
  letterHeight: '1.6',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  zIndex: 5,
  maxWidth: `calc(100% - ${theme.spacing(4)})`,
  position: 'absolute',
  textOverflow: 'ellipsis',
}))
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 4,
  padding: theme.spacing(1.5),
  color: theme.palette.text.primary,
}))
const ProgressBar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .1)'
      : 'rgba(0, 0, 0, .1)',
  height: '100%',
  transform: 'translateZ(0)',
}))
const ToolbarContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  position: 'absolute',
  width: '100%',
  height: '100%',
  '& .fade-enter': {
    opacity: 0,
  },
  '& .fade-enter-active': {
    opacity: 1,
  },
  '& .fade-exit': {
    opacity: 1,
  },
  '& .fade-exit-active': {
    opacity: 0,
  },
  '& div': {
    transitionDuration: theme.transitions.duration.shorter + 'ms',
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}))

const target = typeof window !== 'undefined' ? window : null

const Header: React.FC<HeaderProps> = ({
  children,
  disableShrinking,
  scrollElement,
  hidePositionBar,
  divider,
  scrollThreshold,
}) => {
  const isDesktop = useDesktopMediaQuery()
  const isShrinked = useScrollTrigger({
    threshold: APP_BAR_HEIGHT,
    triggerValue: false,
    enabled: !(disableShrinking || isDesktop),
    target,
    scrollThreshold: scrollThreshold || APP_BAR_HEIGHT,
  })
  const getScrollProgress = React.useCallback(() => {
    const docElement =
      typeof document !== 'undefined' ? document.documentElement : null
    const element = scrollElement || docElement
    const progress =
      element &&
      element.scrollTop / (element.offsetHeight - element.clientHeight - 200)
    return element ? Math.min(progress, 1) : 0
  }, [scrollElement])
  const scrollCallback = React.useCallback(
    () =>
      requestAnimationFrame(() => {
        setScrollProgress(getScrollProgress())
      }),
    [getScrollProgress]
  )
  const [scrollProgress, setScrollProgress] = React.useState(
    getScrollProgress()
  )
  const progressBarStyles = useMemo(
    () => ({ width: (scrollProgress * 100).toString() + '%' }),
    [scrollProgress]
  )

  React.useEffect(() => {
    if (!hidePositionBar) {
      // passive: true enhances scrolling experience
      window.addEventListener('scroll', scrollCallback, { passive: true })
      return () => window.removeEventListener('scroll', scrollCallback)
    } else return () => null
  }, [hidePositionBar, scrollElement, scrollCallback])

  // We use NoSsr here to not make a mismatch with server and client styles
  // As client may have a non-zero scroll progress, ProgressBar should have
  // non-zero width in styles but server doesn't know about client state,
  // so we should not render the header on server. Offset is still rendered.
  return (
    <>
      <NoSsr>
        <StyledAppBar
          disableShrinking={disableShrinking}
          isShrinked={isShrinked}
        >
          {!hidePositionBar && <ProgressBar style={progressBarStyles} />}
          <StyledToolbar>
            <Fade in={!isShrinked} appear={false}>
              <ToolbarContent>
                <StyledIconButton>
                  <BackIcon />
                </StyledIconButton>
                <MountAnimation
                  sx={{
                    height: APP_BAR_HEIGHT / 2,
                  }}
                  keyProp={children?.toString()}
                >
                  <Title>{children}</Title>
                </MountAnimation>
              </ToolbarContent>
            </Fade>
            <Fade in={isShrinked} appear={false}>
              <ToolbarContent>
                <MountAnimation
                  sx={{
                    height: APP_BAR_HEIGHT / 2,
                  }}
                  keyProp={children?.toString() + '_shrinked'}
                >
                  <ShrinkedTitle>{children}</ShrinkedTitle>
                </MountAnimation>
              </ToolbarContent>
            </Fade>
          </StyledToolbar>
        </StyledAppBar>
      </NoSsr>
      <Offset />
      {divider && <Divider />}
    </>
  )
}

export default React.memo(Header)
