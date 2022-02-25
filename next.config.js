/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  images: {
    domains: ['habrastorage.org'],
  },
  webpack5: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    scope: '/',
  },
  env: {
    PUBLIC_URL: 'https://geekr-ssr.vercel.app',
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig(
  withPWA(moduleExports),
  sentryWebpackPluginOptions
)
