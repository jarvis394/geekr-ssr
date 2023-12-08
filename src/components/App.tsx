import { Global, ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import {
  createTheme,
  alpha,
  lighten,
  darken,
  CssBaseline,
  NoSsr,
} from '@mui/material'
import isMobile from 'is-mobile'
import React from 'react'
import {
  APP_BAR_HEIGHT,
  CHROME_ADDRESS_BAR_HEIGHT,
  APP_MAX_WIDTH,
} from 'src/config/constants'
import useDayjsLocaleChange from 'src/hooks/useDayjsLocaleChange'
import useSelector from 'src/hooks/useSelector'
import isDarkTheme from 'src/utils/isDarkTheme'
import { DocumentAppProps } from 'pages/_app'
import AppBar from 'src/components/blocks/AppBar'

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px - ${
    isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0
  }px - 0 + env(safe-area-inset-bottom, 0px))`,
  borderRadius: 0,
  alignItems: 'flex-start',
  flexDirection: 'row',
  width: '100%',
  maxWidth: APP_MAX_WIDTH,
  margin: '0 auto env(safe-area-inset-bottom, 0px) auto',
  boxSizing: 'border-box',
}))

const App: React.FC<DocumentAppProps> = ({ Component, pageProps }) => {
  const storeDisableCookies = useSelector(
    (store) => store.settings?.cookiesPreferences?.disableCookies || false
  )
  const storeTheme = useSelector((store) => store.settings.theme)
  const theme = React.useMemo(() => createTheme(storeTheme), [storeTheme])
  const globalStyles = React.useMemo(
    () => ({
      body: {
        backgroundColor: theme.palette.background.default + ' !important',
        '& a': {
          WebkitTapHighlightColor: alpha(theme.palette.background.paper, 0.3),
        },
        margin: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
        lineHeight: 1.5,
        '&::-webkit-scrollbar': {
          width: 15,
          height: 10,
          background: isDarkTheme(theme)
            ? lighten(theme.palette.background.default, 0.03)
            : theme.palette.background.paper,
          border: '1px solid ' + darken(theme.palette.background.paper, 0.05),
        },
        '&::-webkit-scrollbar-thumb': {
          minHeight: 28,
          background: isDarkTheme(theme)
            ? lighten(theme.palette.background.paper, 0.08)
            : darken(theme.palette.background.paper, 0.08),
          transition: '0.1s',
          '&:hover': {
            background: isDarkTheme(theme)
              ? lighten(theme.palette.background.paper, 0.1)
              : darken(theme.palette.background.paper, 0.1),
          },
          '&:active': {
            background: isDarkTheme(theme)
              ? lighten(theme.palette.background.paper, 0.2)
              : darken(theme.palette.background.paper, 0.2),
          },
        },
        '& *::selection': {
          background: (isDarkTheme(theme) ? darken : lighten)(
            theme.palette.primary.main,
            0.5
          ),
        },
      },
    }),
    [theme]
  )

  useDayjsLocaleChange()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Root>
        <Component {...pageProps} />
      </Root>
    </ThemeProvider>
  )
}

export default App
