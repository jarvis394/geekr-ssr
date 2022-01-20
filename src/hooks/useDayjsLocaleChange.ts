import { useEffect } from 'react'
import useSelector from './useSelector'
import dayjs from 'dayjs'

const useDayjsLocaleChange = () => {
  const language = useSelector(store => store.settings.language.interface)

  useEffect(() => {
    dayjs.locale(language || 'ru')
  }, [language])
}

export default useDayjsLocaleChange
