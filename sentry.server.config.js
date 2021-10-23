import * as Sentry from '@sentry/nextjs'
import { Integrations } from '@sentry/tracing'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://b8c85d9d823249deaa1c06060cb6e795@o929832.ingest.sentry.io/6029376',
  tracesSampleRate: 0,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
})
