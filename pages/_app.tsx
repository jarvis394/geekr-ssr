import {
  StyledEngineProvider,
} from '@mui/material/styles'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
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
import * as userSettings from 'src/utils/userSettings'
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react'
import { MATOMO_SERVER_URL, MATOMO_SITE_ID } from 'src/config/constants'
import useAnalytics from 'src/hooks/useAnalytics'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface DocumentAppProps {
  Component: React.FC
  emotionCache: EmotionCache
  pageProps: Record<string, unknown>
}

const HiddenOnSwitch = styled('div')<{ hide: string }>(({ hide }) => ({
  visibility: hide === 'true' ? 'hidden' : 'visible',
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

const DocumentApp: React.FC<DocumentAppProps> = (props) => {
  const { emotionCache = clientSideEmotionCache, pageProps, Component } = props
  const storeTheme = useSelector((store) => store.settings.theme)
  const theme = React.useMemo(() => createTheme(storeTheme), [storeTheme])
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [matomoInstance, setMatomoInstance] = useState(
    createInstance(matomoInstanceOptions)
  )
  useEffect(() => {
    setIsMounted(true)
    dispatch(initSettingsStore())
    setMatomoInstance(
      createInstance({
        ...matomoInstanceOptions,
        configurations: {
          ...matomoInstanceOptions.configurations,
          disableCookies: userSettings.get().cookiesPreferences.disableCookies,
        },
      })
    )
  }, [])

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
        <HiddenOnSwitch hide={(!isMounted).toString()}>
          <StyledEngineProvider injectFirst>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar />
                <Component {...pageProps} />
              </ThemeProvider>
            </CacheProvider>
          </StyledEngineProvider>
        </HiddenOnSwitch>
      </MatomoProvider>
    </>
  )
}

export default wrapper.withRedux(DocumentApp)
