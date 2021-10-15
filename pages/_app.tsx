import {
  StyledEngineProvider,
} from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../app/styles/createEmotionCache'
import App from 'app/components/App'
import 'app/styles/globals.css'
import React from 'react'
import { Provider } from 'react-redux'
import useStore from 'app/hooks/useStore'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface DocumentAppProps {
  Component: React.FC
  emotionCache: EmotionCache
  pageProps: Record<string, unknown>
}

const DocumentApp: React.FC<DocumentAppProps> = (props) => {
  const { emotionCache = clientSideEmotionCache, pageProps } = props
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <App {...props} />
        </CacheProvider>
      </StyledEngineProvider>
    </Provider>
  )
}

export default DocumentApp
