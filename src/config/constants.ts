import { FeedModeData } from 'src/interfaces/FeedMode'
import UserSettings from 'src/interfaces/UserSettings'

export const APP_VERSION = 'v3'

export const API_URL = 'https://habr.com/kek/'
export const API_TOKEN_URL = 'https://habra.jarvis394.ml/'
export const MATOMO_SERVER_URL = 'https://matomo.jarvis394.ml/'
export const MATOMO_SITE_ID = 2
export const SENTRY_DSN =
  'https://a2e39aec97c844269660ef4e0db0c264@o929832.ingest.sentry.io/5878570'

export const APP_MAX_WIDTH = 1280
export const APP_BAR_HEIGHT = 48
export const CHROME_ADDRESS_BAR_HEIGHT = 56
export const BOTTOM_BAR_HEIGHT = 56
export const LAZY_LOAD_VISIBILITY_THRESHOLD = -200
export const ARTICLE_IMAGE_HEIGHT = 212

/** App keys */
export const APP_KEYS_PREFIX = 'geekr_'
export const USER_SETTINGS_KEY = APP_KEYS_PREFIX + 'userSettings'
export const NEEDS_UPDATE_KEY = APP_KEYS_PREFIX + 'needsUpdate'

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

export const FEED_MODES: FeedModeData[] = [
  {
    text: 'Все подряд',
    to: '/all/',
    mode: 'all',
    isModeForNewTab: true,
    switcherButtonLabel: 'Все',
  },
  {
    text: 'Новые с рейтингом +0',
    to: '/top0/',
    mode: 'top0',
    isModeForNewTab: true,
    switcherButtonLabel: '+0',
  },
  {
    text: 'Новые с рейтингом +10',
    to: '/top10/',
    mode: 'top10',
    isModeForNewTab: true,
    switcherButtonLabel: '+10',
  },
  {
    text: 'Новые с рейтингом +25',
    to: '/top25/',
    mode: 'top25',
    isModeForNewTab: true,
    switcherButtonLabel: '+25',
  },
  {
    text: 'Новые с рейтингом +50',
    to: '/top50/',
    mode: 'top50',
    isModeForNewTab: true,
    switcherButtonLabel: '+50',
  },
  {
    text: 'Новые с рейтингом +100',
    to: '/top100/',
    mode: 'top100',
    isModeForNewTab: true,
    switcherButtonLabel: '+100',
  },
  {
    text: 'Лучшее за день',
    to: '/top/daily/',
    mode: 'daily',
    switcherButtonLabel: 'Сутки',
  },
  {
    text: 'Лучшее за неделю',
    to: '/top/weekly/',
    mode: 'weekly',
    switcherButtonLabel: 'Неделя',
  },
  {
    text: 'Лучшее за месяц',
    to: '/top/monthly/',
    mode: 'monthly',
    switcherButtonLabel: 'Месяц',
  },
  {
    text: 'Лучшее за год',
    to: '/top/yearly/',
    mode: 'yearly',
    switcherButtonLabel: 'Год',
  },
  {
    text: 'Лучшее за всё время',
    to: '/top/alltime/',
    mode: 'alltime',
    switcherButtonLabel: 'Всё время',
  },
]

export const HOUR = 1000 * 60 * 60
export const DEFAULT_UPDATE_INTERVAL = HOUR / 4
