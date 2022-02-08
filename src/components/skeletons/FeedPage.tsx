import { Box, Divider, Skeleton } from '@mui/material'
import React from 'react'
import { ARTICLE_IMAGE_HEIGHT } from 'src/config/constants'
import TextSkeleton from 'src/components/skeletons/Text'

const FeedPage = () => {
  const ArticleItem = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
      }}
    >
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={ARTICLE_IMAGE_HEIGHT}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          marginTop: 1.5,
          marginBottom: 0.5,
          mx: 2,
          alignItems: 'center',
        }}
      >
        <Skeleton variant="text" width={108} height={19.5} />
        <Skeleton variant="circular" width={4} height={4} />
        <Skeleton variant="text" width={156} height={19.5} />
      </Box>
      <Box sx={{ mx: 2 }}>
        <Skeleton variant="text" width={'85%'} height={27} />
        <Skeleton variant="text" width={'50%'} height={27} />
      </Box>
      <Box sx={{ mx: 2, mt: 1 }}>
        <TextSkeleton lines={6} />
      </Box>
      <Box
        sx={{
          mt: 1.5,
          mx: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 1,
          mb: 2,
        }}
      >
        <Skeleton
          sx={{ borderRadius: '4px' }}
          variant="rectangular"
          width={24}
          height={24}
        />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Skeleton variant="text" width={96} height={24} />
        </Box>
        <Skeleton variant="text" width={144} height={24} />
      </Box>
      <Divider />
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
      }}
    >
      {new Array(5).fill(null).map((_, i) => (
        <ArticleItem key={i} />
      ))}
    </Box>
  )
}

export default FeedPage
