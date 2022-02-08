import { alpha, darken, lighten } from '@mui/material'
import { blue } from '@mui/material/colors'
import DefaultThemeID from 'src/types/DefaultThemeID'
import { CustomTheme } from 'src/types/UserSettings'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    text: TypeText
  }
  interface TypeText {
    hint: string
  }
}

const themes: Record<DefaultThemeID, Partial<CustomTheme>> = {
  light: {
    displayName: 'Светлая',
    palette: {
      mode: 'light',
      background: {
        paper: '#ffffff',
        default: '#f5f5f5',
      },
      primary: {
        main: blue.A400,
        light: blue.A200,
        dark: blue.A700,
      },
      text: {
        primary: alpha('#000000', 0.87),
        secondary: alpha('#000000', 0.54),
        disabled: alpha('#000000', 0.38),
        hint: alpha('#000000', 0.38),
      },
    },
  },
  dark: {
    displayName: 'Тёмная',
    palette: {
      mode: 'dark',
      background: {
        paper: '#181818',
        default: '#0e0e0e',
      },
      primary: {
        main: blue.A100,
        light: lighten(blue.A100, 0.05),
        dark: darken(blue.A100, 0.1),
      },
      text: {
        primary: '#e9e9e9',
        secondary: alpha('#e9e9e9', 0.54),
        disabled: alpha('#e9e9e9', 0.38),
        hint: alpha('#e9e9e9', 0.38),
      },
    },
  },
  oled: {
    displayName: 'OLED',
    palette: {
      mode: 'dark',
      background: {
        paper: '#0e0e0e',
        default: '#000000',
      },
      primary: {
        main: blue.A100,
        light: lighten(blue.A100, 0.05),
        dark: darken(blue.A100, 0.1),
      },
      text: {
        primary: '#e9e9e9',
        secondary: alpha('#e9e9e9', 0.54),
        disabled: alpha('#e9e9e9', 0.38),
        hint: alpha('#e9e9e9', 0.38),
      },
    },
  },
  sepia: {
    displayName: 'Сепия',
    palette: {
      mode: 'light',
      background: {
        paper: '#ffecb3',
        default: '#f5e2a8',
      },
      primary: {
        main: '#679f9d',
        light: lighten('#679f9d', 0.05),
        dark: darken('#679f9d', 0.1),
      },
      text: {
        primary: '#5b4636',
        secondary: alpha('#5b4636', 0.54),
        disabled: alpha('#5b4636', 0.38),
        hint: alpha('#5b4636', 0.38),
      },
    },
  },
  dimmed: {
    displayName: 'Ночная',
    palette: {
      mode: 'dark',
      background: {
        paper: '#252c35',
        default: '#1c2128',
      },
      primary: {
        main: blue.A100,
        light: lighten(blue.A100, 0.05),
        dark: darken(blue.A100, 0.1),
      },
      text: {
        primary: '#cdd9e5',
        secondary: alpha('#cdd9e5', 0.54),
        disabled: alpha('#cdd9e5', 0.38),
        hint: alpha('#cdd9e5', 0.38),
      },
    },
  },
}

export default themes
