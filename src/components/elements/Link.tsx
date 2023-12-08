import React, { forwardRef, Ref } from 'react'
import Link, { LinkProps } from 'next/link'
import {
  alpha,
  Box,
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  styled,
} from '@mui/material'
import Image from 'next/image'

type LinkRef = HTMLAnchorElement
type NextLinkProps = Omit<MuiLinkProps, 'href' | 'classes' | 'variant'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'> & {
    variant?: MuiLinkProps['variant'] | 'highlight'
  }

const MuiLinkVariantHighlight = styled(MuiLink)(({ theme }) => ({
  color: alpha(theme.palette.text.primary, 0.32),
  transitionDuration: theme.transitions.duration.shortest + 'ms',
  transitionTimingFunction: theme.transitions.easing.easeOut,
  WebkitTapHighlightColor: 'transparent',
  position: 'relative',
  textDecoration: 'none !important',
  '&:hover': {
    color: theme.palette.primary.light,
  },
  '&:active::before': {
    opacity: 1,
  },
  '&::before': {
    content: '""',
    backgroundColor: alpha(theme.palette.primary.light, 0.12),
    borderRadius: 8,
    position: 'absolute',
    width: 'calc(100% + 12px)',
    height: 'calc(100% + 6px)',
    left: '-6px',
    top: '-3px',
    opacity: 0,
  },
}))

const NextLink = (
  { href, as, prefetch, underline, variant, ...props }: NextLinkProps,
  ref: Ref<LinkRef>
) => {
  let component: React.ReactElement
  switch (variant) {
    case 'highlight':
      component = (
        <>
          {/* // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Icon"
            width={16}
            height={16}
            src={'https://favicon.yandex.net/favicon/geekr.vercel.app?color=0,0,0,0&size=32&stub=1'}
          /> */}
          <MuiLinkVariantHighlight ref={ref} {...props} underline="none" />
        </>
      )
      break
    default:
      component = (
        <MuiLink ref={ref} {...props} underline={underline || 'none'} />
      )
      break
  }

  return (
    <Link href={href} as={as} prefetch={prefetch} passHref legacyBehavior>
      {component}
    </Link>
  )
}

export default forwardRef<LinkRef, NextLinkProps>(NextLink)
