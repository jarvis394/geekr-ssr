import { Button, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import Link from 'src/components/elements/Link'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { setSettings } from 'src/store/actions/settings'

const Page = () => {
  const dispatch = useDispatch()
  const setDarkTheme = () => dispatch(setSettings({ themeID: 'dark' }))
  const setLightTheme = () => dispatch(setSettings({ themeID: 'light' }))
  
  return (
    <>
      <Head>
        <title>geekr. | page</title>
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
