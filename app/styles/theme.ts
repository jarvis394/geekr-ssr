import { DeprecatedThemeOptions } from '@mui/material/styles'
import * as userSettings from 'app/utils/userSettings'
import DefaultThemeID from 'app/interfaces/DefaultThemeID'
import { DEFAULT_USER_SETTINGS } from 'app/config/constants'
import themes from 'app/config/themes'

const generateTheme = (
  themeID?: DefaultThemeID | string
): DeprecatedThemeOptions => {
  const localStorageUserSettings = userSettings.get()
  const localStorageCustomThemes = localStorageUserSettings.customThemes
  const localStorageThemeID = localStorageUserSettings.themeID
  const id = themeID || localStorageThemeID || DEFAULT_USER_SETTINGS.themeID
  const customTheme = localStorageCustomThemes.find((e) => e.id === id)
  const defaultPalette = themes[id as DefaultThemeID]?.palette

  return {
    palette: customTheme?.palette || defaultPalette,
    shape: { borderRadius: 4 },
    overrides: {
      MuiPaper: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
    props: {
      // Ripple on IconButtons is delayed and not very effective in its action
      // So we change its styles to the custom ones
      MuiIconButton: {
        TouchRippleProps: {
          classes: {
            rippleVisible: 'IconButton_TouchRipple-rippleVisible',
            childLeaving: 'IconButton_TouchRipple-childLeaving',
          },
        },
      },
    },
  }
}

export default generateTheme
