import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import Header from 'src/components/blocks/Header'

const Article = () => {
  const router = useRouter()
  const articleId = router.query.id

  return (
    <div>
      <Header>Title header</Header>
      {articleId}
      <Box
        sx={{
          height: '200vh',
          display: 'flex',
        }}
      >
        asda
      </Box>
    </div>
  )
}

export default Article
