import { PaletteMode } from '@mui/material'
import DefaultThemeID from './DefaultThemeID'

export interface CustomTheme {
  displayName: string
  // Theme ID is a string; ex. 'sepia' or '12383927493'
  id: string
  palette: {
    mode: PaletteMode
    primary: {
      main: string
      light: string
      dark: string
    }
    background: {
      paper: string
      default: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
      hint: string
    }
  }
}

export default interface UserSettings {
  themeID: DefaultThemeID | string
  customThemes: CustomTheme[]
  hiddenAuthors: string[]
  hiddenCompanies: string[]
  autoChangeTheme: boolean
  preferredLightTheme: DefaultThemeID | string
  preferredDarkTheme: DefaultThemeID | string
  cookiesPreferences: {
    disableCookies: boolean
  }
  readerSettings: {
    fontSize: number
    fontFamily: string
    changeLinks: boolean
    replaceImagesWithPlaceholder: boolean
  }
  interfaceFeed: {
    isCompact: boolean
    hideMegaposts: boolean
    hideNewsBlock: boolean
    disablePostImage: boolean
    openPostsInNewTab: boolean
  }
  interfaceComments: {
    showThreads: boolean
    sortByKarma: boolean
  }
  language: {
    feed: 'ru' | 'en' | 'ru,en'
    interface: 'ru' | 'en'
  }
}
