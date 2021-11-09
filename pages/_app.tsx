import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from 'src/styles/createEmotionCache'
import Head from 'next/head'
import App from 'src/components/App'
import { wrapper } from 'src/store'
import { INIT_SETTINGS_STORE } from 'src/store/reducers/settings/types'
import * as sw from 'src/lib/serviceWorker'
import serviceWorkerConfig from 'src/config/serviceWorkerConfig'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface DocumentAppProps {
  Component: React.FC
  emotionCache: EmotionCache
  pageProps: Record<string, unknown>
}

const DocumentApp = (props: DocumentAppProps) => {
  const { emotionCache = clientSideEmotionCache } = props

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to register the SW when client side is loaded
      sw.register(serviceWorkerConfig)
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=0"
        />
        <title>geekr.</title>
      </Head>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <App {...props} />
        </CacheProvider>
      </StyledEngineProvider>
    </>
  )
}

DocumentApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }) => {
      // Initialize theme and user settings
      store.dispatch({ type: INIT_SETTINGS_STORE })

      return {
        pageProps: {
          // Call page-level getInitialProps
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      }
    }
)

export default wrapper.withRedux(DocumentApp)
