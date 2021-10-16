import {
  AppBar as MUIAppBar,
  Toolbar,
  styled,
  alpha,
  IconButton,
} from '@mui/material'
import React from 'react'
import { APP_BAR_HEIGHT } from 'src/config/constants'
import Link from 'src/components/elements/Link'
import { Icon28SettingsOutline as SettingsIcon } from '@vkontakte/icons'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)
const StyledAppBar = styled(MUIAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  position: 'fixed',
  height: APP_BAR_HEIGHT,
  flexGrow: 1,
  zIndex: theme.zIndex.appBar,
  willChange: 'transform',
}))
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  margin: 'auto',
  minHeight: 'unset',
  height: APP_BAR_HEIGHT,
  maxWidth: 720,
  width: '100%',
  flexDirection: 'row',
  padding: theme.spacing(0, 2),
  justifyContent: 'flex-start',
  alignItems: 'center',
}))
const TitleWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  height: '100%',
}))
const Title = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 800,
  fontSize: 20,
  height: '100%',
  alignItems: 'center',
  display: 'flex',
  fontFamily: 'Google Sans',
  cursor: 'pointer',
  WebkitTapHighlightColor: alpha(theme.palette.background.paper, 0.3),
  userSelect: 'none',
}))

const AppBar = () => {
  return (
    <>
      <StyledAppBar position="fixed" elevation={0}>
        <StyledToolbar>
          <TitleWrapper>
            <Title href="/" underline="none">
              geekr.
            </Title>
          </TitleWrapper>
          <IconButton sx={{ width: APP_BAR_HEIGHT, height: APP_BAR_HEIGHT }}>
            <SettingsIcon width={24} height={24} />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
      <Offset />
    </>
  )
}

export default React.memo(AppBar)
