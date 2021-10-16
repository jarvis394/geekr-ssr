import React from 'react'
import { Typography, styled } from '@mui/material'
import Link from 'src/components/elements/Link'
import isMobile from 'is-mobile'
import {
  CHROME_ADDRESS_BAR_HEIGHT,
  APP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
} from 'src/config/constants'

const Root = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 600,
  width: '100%',
  flexDirection: 'column',
  height: `calc(100vh - ${APP_BAR_HEIGHT}px - ${BOTTOM_BAR_HEIGHT}px - ${
    isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : '0'
  }px)`,
}))
const Title = styled(Typography)(() => ({
  fontFamily: 'Google Sans',
  fontWeight: 800,
  fontSize: 28,
}))
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.light,
  },
}))
const Text = styled(Typography)(() => ({
  fontFamily: 'Google Sans',
  fontSize: 16,
}))

const NotFoundPage = () => {
  return (
    <Root>
      <Title>four-o-four</Title>
      <Text>Страница не найдена.</Text>
      <Text>
        Может, <StyledLink href="/">вернёмся домой</StyledLink>?
      </Text>
    </Root>
  )
}

export default React.memo(NotFoundPage)
