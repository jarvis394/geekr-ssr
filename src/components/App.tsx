import { Global, ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { createTheme, alpha, lighten, darken, CssBaseline } from '@mui/material'
import isMobile from 'is-mobile'
import React from 'react'
import {
  APP_BAR_HEIGHT,
  CHROME_ADDRESS_BAR_HEIGHT,
  APP_MAX_WIDTH,
  MATOMO_SERVER_URL,
  MATOMO_SITE_ID,
} from 'src/config/constants'
import useAnalytics from 'src/hooks/useAnalytics'
import useSelector from 'src/hooks/useSelector'
import isDarkTheme from 'src/utils/isDarkTheme'
import { DocumentAppProps } from 'pages/_app'
import AppBar from 'src/components/blocks/AppBar'
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react'

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px - ${
    isMobile() ? CHROME_ADDRESS_BAR_HEIGHT : 0
  }px - ${
    // shouldShowAppBar ? BOTTOM_BAR_HEIGHT : 0
    0
  }px + env(safe-area-inset-bottom, 0px))`,
  borderRadius: 0,
  alignItems: 'flex-start',
  flexDirection: 'row',
  width: '100%',
  maxWidth: APP_MAX_WIDTH,
  margin: `0 auto calc(${
    // shouldShowAppBar ? BOTTOM_BAR_HEIGHT : 0
    0
  }px + env(safe-area-inset-bottom, 0px)) auto`,
  boxSizing: 'border-box',
}))

const App: React.FC<DocumentAppProps> = ({ Component, pageProps }) => {
  const storeDisableCookies = useSelector(
    (store) => store.settings.cookiesPreferences.disableCookies
  )
  const storeTheme = useSelector((store) => store.settings.theme)
  const theme = React.useMemo(() => createTheme(storeTheme), [storeTheme])
  const globalStyles = React.useMemo(
    () => ({
      body: {
        backgroundColor: theme.palette.background.paper + ' !important',
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

  useAnalytics()

  const matomoInstanceOptions = {
    urlBase: MATOMO_SERVER_URL,
    siteId: MATOMO_SITE_ID,
    linkTracking: false,
    configurations: {
      setRequestMethod: 'POST',
      setRequestContentType: 'application/json',
      setDoNotTrack: false,
      setSecureCookie: true,
      disableCookies: storeDisableCookies,
    },
  }

  return (
    <MatomoProvider value={createInstance(matomoInstanceOptions)}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global styles={globalStyles} />
        <AppBar />
        <Root>
          <Component {...pageProps} />
        </Root>
      </ThemeProvider>
    </MatomoProvider>
  )
}

export default App
