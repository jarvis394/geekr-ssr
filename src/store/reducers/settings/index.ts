import { SET_SETTINGS, GET_SETTINGS, INIT_SETTINGS_STORE, State } from './types'
import generateTheme from 'src/styles/theme'
import * as userSettings from 'src/utils/userSettings'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'
import { DEFAULT_USER_SETTINGS } from 'src/config/constants'

const initialState: State = {
  ...DEFAULT_USER_SETTINGS,
} as State

const settingsStore = (
  state = initialState,
  { type, payload }: AnyAction
): State => {
  switch (type) {
    case HYDRATE: {
      return {
        ...state,
        ...payload.settings,
        theme: generateTheme(payload?.settings?.themeID, payload.settings),
      }
    }

    case SET_SETTINGS: {
      const newSettings = userSettings.set(payload)
      const shouldUpdateTheme = !!payload.themeID
      return {
        ...newSettings,
        theme: shouldUpdateTheme
          ? generateTheme(newSettings.themeID, newSettings)
          : state.theme,
      }
    }

    case GET_SETTINGS:
      return { theme: state.theme, ...userSettings.get() }

    case INIT_SETTINGS_STORE: {
      const theme = generateTheme(state.themeID, state)
      return { ...state, theme }
    }

    default:
      return state
  }
}

export default settingsStore
