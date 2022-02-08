import { useTheme, useMediaQuery } from '@mui/material'
import { APP_DESKTOP_WIDTH } from 'src/config/constants'

const useDesktopMediaQuery = () => {
  const theme = useTheme()
  const query = useMediaQuery(theme.breakpoints.up(APP_DESKTOP_WIDTH), {
    noSsr: false,
  })
  return query
}

export default useDesktopMediaQuery
