import UserSettings from 'app/interfaces/UserSettings'

/** App keys */
export const APP_KEYS_PREFIX = 'geekr_'
export const USER_SETTINGS_KEY = APP_KEYS_PREFIX + 'userSettings'

export const DEFAULT_USER_SETTINGS: UserSettings = {
  themeID: 'oled',
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
