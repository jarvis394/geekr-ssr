import UserSettings from 'src/interfaces/UserSettings'

export const APP_VERSION = 'v3'
export const MATOMO_SERVER_URL = 'https://matomo.jarvis394.ml/'
export const MATOMO_SITE_ID = 1
export const SENTRY_DSN =
  'https://a2e39aec97c844269660ef4e0db0c264@o929832.ingest.sentry.io/5878570'

export const APP_BAR_HEIGHT = 48
export const CHROME_ADDRESS_BAR_HEIGHT = 56
export const BOTTOM_BAR_HEIGHT = 56

/** App keys */
export const APP_KEYS_PREFIX = 'geekr_'
export const USER_SETTINGS_KEY = APP_KEYS_PREFIX + 'userSettings'

export const DEFAULT_USER_SETTINGS: UserSettings = {
  themeID: 'light',
  customThemes: [],
  hiddenAuthors: [],
  hiddenCompanies: [],
  preferredDarkTheme: 'dark',
  preferredLightTheme: 'light',
  autoChangeTheme: true,
  cookiesPreferences: {
    disableCookies: false,
  },
  readerSettings: {
    fontFamily: 'Roboto',
    fontSize: 16,
    changeLinks: false,
    replaceImagesWithPlaceholder: false,
  },
  interfaceFeed: {
    isCompact: false,
    hideMegaposts: false,
    hideNewsBlock: false,
    disablePostImage: false,
    openPostsInNewTab: false,
  },
  interfaceComments: {
    showThreads: true,
    sortByKarma: false,
  },
  language: {
    feed: 'ru',
    interface: 'ru',
  },
}
