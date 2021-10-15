import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import useSelector from 'app/hooks/useSelector'
import { DocumentAppProps } from 'pages/_app'
import React from 'react'

const App: React.FC<DocumentAppProps> = (props) => {
  const { Component, pageProps } = props
  const store = useSelector((store) => store)
  const storeTheme = useSelector((store) => store.settings.theme)
  const theme = React.useMemo(() => createTheme(storeTheme), [storeTheme])
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
