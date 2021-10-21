import { SET_SETTINGS, GET_SETTINGS, INIT_SETTINGS_STORE, State } from './types'
import generateTheme from 'src/styles/theme'
import * as userSettings from 'src/utils/userSettings'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'
import { DEFAULT_USER_SETTINGS } from 'src/config/constants'

const initialState: State = {
  theme: generateTheme(DEFAULT_USER_SETTINGS.themeID),
  ...DEFAULT_USER_SETTINGS
} as State

const settingsStore = (
  state = initialState,
  { type, payload }: AnyAction
): State => {
  switch (type) {
    case HYDRATE: {
      state = payload.settings
      state.theme = generateTheme(state.themeID)
      return state
    }
    case SET_SETTINGS: {
      const newSettings = userSettings.set(payload)
      const shouldUpdateTheme = !!payload.themeID
      state = {
        ...newSettings,
        theme: shouldUpdateTheme
          ? generateTheme(newSettings.themeID)
          : state.theme,
      }
      return state
    }

    case GET_SETTINGS:
      return { theme: state.theme, ...userSettings.get() }

    case INIT_SETTINGS_STORE: {
      const userLocalSettings = userSettings.get()
      const theme = generateTheme(userLocalSettings.themeID)
      state = { theme, ...userLocalSettings }
      return state
    }

    default:
      return state
  }
}

export default settingsStore
