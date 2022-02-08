import UserSettings from 'src/types/UserSettings'
import { DEFAULT_USER_SETTINGS, USER_SETTINGS_KEY } from 'src/config/constants'
import deepmerge from 'deepmerge'

// TODO: refactor to return { success: boolean, data: UserSettings }
// to show a notification that settings are being overwritten with defaults
export const get = (): UserSettings => {
  if (typeof localStorage === 'undefined')
    throw new Error('Cannot get user settings on the server side')

  const data = localStorage.getItem(USER_SETTINGS_KEY)
  let res: UserSettings

  if (!data) return DEFAULT_USER_SETTINGS

  try {
    res = JSON.parse(data)
  } catch (e) {
    console.error('Cannot parse user settings:', e, '\nGot:', data)
    return DEFAULT_USER_SETTINGS
  }

  return deepmerge(DEFAULT_USER_SETTINGS, res)
}

export const set = (payload: Partial<UserSettings>): UserSettings => {
  if (typeof localStorage === 'undefined')
    throw new Error('Cannot set user settings on the server side')

  const localStorageData = get()
  const data = deepmerge(localStorageData, payload)
  localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(data))

  return data
}

export const decode = (payload: string): UserSettings => JSON.parse(Buffer.from(payload, 'base64').toString())
export const encode = (payload: UserSettings): string => Buffer.from(JSON.stringify(payload)).toString('base64')
