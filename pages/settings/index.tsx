import { Button, Container, Paper } from '@mui/material'
import React from 'react'
import Link from 'src/components/elements/Link'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { setSettings } from 'src/store/actions/settings'

const Page = () => {
  const socialPreviewURL =
    'https://habra.jarvis394.ml/social?t=asd&s=dsa'
  const dispatch = useDispatch()
  const setDarkTheme = () => dispatch(setSettings({ themeID: 'dark' }))
  const setLightTheme = () => dispatch(setSettings({ themeID: 'light' }))

  return (
    <>
      <Head>
        <title>geekr. | settings</title>
        <meta itemProp="image" content={socialPreviewURL} />
        <meta property="og:image" content={socialPreviewURL} />
        <meta property="vk:image" content={socialPreviewURL} />
        <meta name="twitter:image" content={socialPreviewURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@habrahabr" />
        <meta name="twitter:title" content={'Title of the post'} />
        <meta name="description" content={'Here is the description'} />
        <meta itemProp="description" content={'Here is the description'} />
        <meta property="og:description" content={'Here is the description'} />
        <meta
          property="aiturec:description"
          content={'Here is the description'}
        />
        <meta name="twitter:description" content={'Here is the description'} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={'https://geekr-ssr.vercel.app/settings'}
        />
        <meta itemProp="name" content={'Title of the post'} />
        <meta property="og:title" content={'Title of the post'} />
      </Head>
      <Paper>
        <Container maxWidth="sm">
          <Button onClick={setDarkTheme}>set dark theme</Button>
          <Button onClick={setLightTheme}>set light theme</Button>
          <Link href="/">Go back</Link>
        </Container>
      </Paper>
    </>
  )
}

export default Page
