import {
  alpha,
  darken,
  lighten,
  StyledEngineProvider,
} from '@mui/material/styles'
import {
  CacheProvider,
  EmotionCache,
  Global,
  ThemeProvider,
} from '@emotion/react'
import createEmotionCache from 'src/styles/createEmotionCache'
import React, { useEffect, useState } from 'react'
import { wrapper } from 'src/store'
import useSelector from 'src/hooks/useSelector'
import { createTheme, CssBaseline } from '@mui/material'
import { initSettingsStore } from 'src/store/actions/settings'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import AppBar from 'src/components/blocks/AppBar'
import { styled } from '@mui/material'
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react'
import {
  APP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  CHROME_ADDRESS_BAR_HEIGHT,
  MATOMO_SERVER_URL,
  MATOMO_SITE_ID,
  APP_MAX_WIDTH,
} from 'src/config/constants'
import useAnalytics from 'src/hooks/useAnalytics'
import * as userSettingsUtils from 'src/utils/userSettings'
import generateTheme from 'src/styles/theme'
import isDarkTheme from 'src/utils/isDarkTheme'
import { Box } from '@mui/system'
import isMobile from 'is-mobile'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface DocumentAppProps {
  Component: React.FC
  emotionCache: EmotionCache
  pageProps: Record<string, unknown>
}

const HiddenOnSwitch = styled('div')<{ hide: string }>(({ hide }) => ({
  // visibility: hide === 'true' ? 'hidden' : 'visible',
  opacity: hide === 'true' ? 0 : 1,
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out',
}))

const matomoInstanceOptions = {
  urlBase: MATOMO_SERVER_URL,
  siteId: MATOMO_SITE_ID,
  linkTracking: false,
  configurations: {
    setRequestMethod: 'POST',
    setRequestContentType: 'application/json',
    setDoNotTrack: false,
    setSecureCookie: true,
  },
}

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

const DocumentApp = (props: DocumentAppProps) => {
  const { emotionCache = clientSideEmotionCache, pageProps, Component } = props
  const storeTheme = useSelector((store) => store.settings.theme)
  const theme = React.useMemo(() => createTheme(storeTheme), [storeTheme])
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [matomoInstance, setMatomoInstance] = useState(
    createInstance(matomoInstanceOptions)
  )
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

  useEffect(() => {
    setIsMounted(true)
    dispatch(initSettingsStore())
    setMatomoInstance(
      createInstance({
        ...matomoInstanceOptions,
        configurations: {
          ...matomoInstanceOptions.configurations,
          disableCookies:
            userSettingsUtils.get().cookiesPreferences.disableCookies,
        },
      })
    )
  }, [])

  useEffect(() => {
    const styleElement = document.getElementById('geekr-body-style-el')
    if (styleElement) styleElement.remove()
  }, [])

  if (typeof window !== 'undefined' && !document.body.className) {
    const userSettings = userSettingsUtils.get()
    const theme = generateTheme(userSettings.themeID)
    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      .geekr-body {
        background-color: ${theme.palette.background.paper} !important;
        color: ${theme.palette.text.primary} !important;
      }
    `
    styleElement.id = 'geekr-body-style-el'
    document.head.appendChild(styleElement)
    document.body.className = 'geekr-body'
  }

  useAnalytics()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=0"
        />
        <title>geekr.</title>
      </Head>
      <MatomoProvider value={matomoInstance}>
        {!isMounted && (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: 'calc(100vh - 56px)',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            not mounted
          </Box>
        )}
        <StyledEngineProvider injectFirst>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <HiddenOnSwitch hide={(!isMounted).toString()}>
                <Global styles={isMounted ? globalStyles : {}} />
                <CssBaseline />
                <AppBar />
                <Root>
                  <Component {...pageProps} />
                </Root>
              </HiddenOnSwitch>
            </ThemeProvider>
          </CacheProvider>
        </StyledEngineProvider>
      </MatomoProvider>
    </>
  )
}

export default wrapper.withRedux(DocumentApp)
