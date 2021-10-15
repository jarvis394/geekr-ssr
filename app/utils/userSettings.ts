import UserSettings from 'app/interfaces/UserSettings'
import { DEFAULT_USER_SETTINGS, USER_SETTINGS_KEY } from 'app/config/constants'
import deepmerge from 'deepmerge'

// TODO: refactor to return { success: boolean, data: UserSettings }
// to show a notification that settings are being overwritten with defaults
export const get = (): UserSettings => {
  if (typeof localStorage === 'undefined') return DEFAULT_USER_SETTINGS
  
  const data = localStorage.getItem(USER_SETTINGS_KEY)
  let res: UserSettings

  if (!data) return DEFAULT_USER_SETTINGS

  try {
    res = JSON.parse(data)
  } catch (e) {
    console.error('Cannot parse user settings:', e, '\nGot:', data)
    return DEFAULT_USER_SETTINGS
  }

  return deepmerge(res, DEFAULT_USER_SETTINGS)
}

export const set = (payload: Partial<UserSettings>): UserSettings => {
  const localStorageData = get()
  const data = deepmerge(localStorageData, payload)
  localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(data))
  
  return data
}
