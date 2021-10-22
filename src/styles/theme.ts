import { ThemeOptions } from '@mui/material/styles'
import DefaultThemeID from 'src/interfaces/DefaultThemeID'
import { APP_BAR_HEIGHT, DEFAULT_USER_SETTINGS } from 'src/config/constants'
import themes from 'src/config/themes'
import { UserSettings } from 'src/interfaces'

const generateTheme = (
  themeID?: DefaultThemeID | string,
  userSettings?: UserSettings
): ThemeOptions => {
  const defaultPalette =
    themes[DEFAULT_USER_SETTINGS.themeID as DefaultThemeID].palette
  const theme: ThemeOptions = {
    palette: defaultPalette,
    shape: { borderRadius: 4 },
    mixins: {
      toolbar: {
        height: APP_BAR_HEIGHT,
        minHeight: APP_BAR_HEIGHT,
      },
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

  const customThemes = userSettings.customThemes
  const clientThemeId = userSettings.themeID
  const id = themeID || clientThemeId || DEFAULT_USER_SETTINGS.themeID
  const customTheme = customThemes.find((e) => e.id === id)
  const paletteFromAppThemes = themes[id as DefaultThemeID]?.palette

  if (customTheme) theme.palette = customTheme.palette
  else if (paletteFromAppThemes) theme.palette = paletteFromAppThemes

  return theme
}

export default generateTheme
