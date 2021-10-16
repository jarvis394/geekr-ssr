import { ThemeOptions } from '@mui/material/styles'
import * as userSettings from 'src/utils/userSettings'
import DefaultThemeID from 'src/interfaces/DefaultThemeID'
import { APP_BAR_HEIGHT, DEFAULT_USER_SETTINGS } from 'src/config/constants'
import themes from 'src/config/themes'

const generateTheme = (themeID?: DefaultThemeID | string): ThemeOptions => {
  // const defaultPalette = themes[id as DefaultThemeID]?.palette
  const defaultPalette = themes[DEFAULT_USER_SETTINGS.themeID as DefaultThemeID].palette
  const theme: ThemeOptions = {
    palette: defaultPalette,
    shape: { borderRadius: 4 },
    mixins: {
      toolbar: {
        height: APP_BAR_HEIGHT,
        minHeight: APP_BAR_HEIGHT,
      }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 8,
          },
        },
      },
      // MuiIconButton: {
      //   defaultProps: {
      //     // Ripple on IconButtons is delayed and not very effective in its action
      //     // So we change its styles to the custom ones
      //     TouchRippleProps: {
      //       classes: {
      //         rippleVisible: 'IconButton_TouchRipple-rippleVisible',
      //         childLeaving: 'IconButton_TouchRipple-childLeaving',
      //       },
      //     },
      //   },
      // },
    },
  }

  if (typeof window === 'undefined') return theme

  const localStorageUserSettings = userSettings.get()
  const localStorageCustomThemes = localStorageUserSettings.customThemes
  const localStorageThemeID = localStorageUserSettings.themeID
  const id = themeID || localStorageThemeID || DEFAULT_USER_SETTINGS.themeID
  const customTheme = localStorageCustomThemes.find((e) => e.id === id)
  const paletteFromAppThemes = themes[id as DefaultThemeID]?.palette

  if (customTheme) theme.palette = customTheme.palette
  else if (paletteFromAppThemes) theme.palette = paletteFromAppThemes

  return theme
}

export default generateTheme
