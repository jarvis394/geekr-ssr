/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const { withSentryConfig } = require('@sentry/nextjs')

/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  images: {
    domains: ['habrastorage.org'],
  },
  // pwa: {
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  //   scope: '/',
  // },
  env: {
    PUBLIC_URL: 'https://geekr-ssr.vercel.app',
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

// module.exports = withSentryConfig(
//   withPWA(moduleExports),
//   sentryWebpackPluginOptions
// )
module.exports = moduleExports

