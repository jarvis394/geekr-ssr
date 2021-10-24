import { Button, Container, Paper } from '@mui/material'
import React from 'react'
import Link from 'src/components/elements/Link'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { setSettings } from 'src/store/actions/settings'

const Page = () => {
  const socialPreviewURL =  'https://geekr-lambda.vercel.app/api/share?title=%D0%9C%D0%B0%D0%BC%D0%B0,%20%D1%8F%20%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BB%20%D0%A5%D0%B0%D0%B1%D1%80%20%D0%B8%20%D1%81%D0%BD%D0%BE%D0%B2%D0%B0%20%D0%B5%D0%B3%D0%BE%20%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BB%20%D0%BB%D0%BE%D0%BB%20%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D0%BB&hub=%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0'
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
