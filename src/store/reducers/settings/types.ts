import { ThemeOptions } from '@mui/material'
import UserSettings from 'src/types/UserSettings'

export const PREFIX = 'SETTINGS_'
export const SET_SETTINGS = PREFIX + 'SET'
export const GET_SETTINGS = PREFIX + 'GET'
export const INIT_SETTINGS_STORE = PREFIX + 'INIT_SETTINGS_STORE'

export interface State extends UserSettings {
  theme: ThemeOptions
}