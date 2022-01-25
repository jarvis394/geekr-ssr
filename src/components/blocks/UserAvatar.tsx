import React from 'react'
import { Avatar, styled, SxProps, Theme } from '@mui/material'
import UserPlaceholder from 'src/components/svg/UserPlaceholder'

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
}))

const StyledUserPlaceholder = styled(UserPlaceholder)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '2px !important',
}))

const UserAvatar: React.FC<{
  src: string
  alias: string
}> = ({ src, alias, ...props }) => {
  const habrStubPaths = [
    'habr.com/images/avatars/stub-user',
    'habr.com/images/stub-user',
  ]
  // Checks if user has a stub Habr avatar or not
  // If false, then user has a custom avatar and we should render Avatar component
  // Otherwise, we render UserPlaceholder
  const state = src
    ? habrStubPaths.some((e) => src.split('//')[1].startsWith(e))
    : true

  return state ? (
    <StyledUserPlaceholder num={alias?.length || 0} {...props} />
  ) : (
    <StyledAvatar src={src} {...props} />
  )
}

export default React.memo(UserAvatar)
