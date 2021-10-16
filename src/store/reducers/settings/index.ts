import { SET_SETTINGS, GET_SETTINGS, INIT_SETTINGS_STORE } from './types'
import generateTheme from 'src/styles/theme'
import * as userSettings from 'src/utils/userSettings'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'
import { DEFAULT_USER_SETTINGS } from 'src/config/constants'

const initialState = {
  theme: generateTheme(DEFAULT_USER_SETTINGS.themeID),
}

const settingsStore = (
  state = initialState,
  { type, payload }: AnyAction
): typeof initialState => {
  switch (type) {
    case HYDRATE: {
      console.log(state, payload)
      return { ...state, ...payload }
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
