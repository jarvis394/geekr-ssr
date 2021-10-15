import { SET_SETTINGS, GET_SETTINGS } from './types'
import generateTheme from 'app/styles/theme'
import * as userSettings from 'app/utils/userSettings'
import { HYDRATE } from 'next-redux-wrapper'

const userLocalSettings = userSettings.get()
const theme = generateTheme(userLocalSettings.themeID)

const initialState = {
  theme,
  ...userLocalSettings,
}

const settingsStore = (
  state = initialState,
  { type, payload }
): typeof initialState => {
  switch (type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return {...state, ...payload}
    case SET_SETTINGS: {
      const newSettings = userSettings.set(payload)
      const shouldUpdateTheme = !!payload.themeType
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

    default:
      return state
  }
}

export default settingsStore
