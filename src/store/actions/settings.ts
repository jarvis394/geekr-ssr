import UserSettings from 'src/types/UserSettings'
import {
  SET_SETTINGS,
  GET_SETTINGS,
  INIT_SETTINGS_STORE,
} from '../reducers/settings/types'

export const setSettings = (payload: Partial<UserSettings>) => (dispatch) =>
  dispatch({
    type: SET_SETTINGS,
    payload,
  })

export const getSettings = () => (dispatch) =>
  dispatch({
    type: GET_SETTINGS,
  })

export const initSettingsStore = () => (dispatch) =>
  dispatch({
    type: INIT_SETTINGS_STORE,
  })
