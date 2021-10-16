import { Theme } from '@mui/material'

const isDarkTheme = (theme: Theme) => theme.palette.mode === 'dark'

export default isDarkTheme
