import { useEffect } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { APP_VERSION } from 'src/config/constants'
import { useRouter } from 'next/router'

const useAnalytics = () => {
  const router = useRouter()
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      // customDimensions: [
      //   {
      //     id: 1,
      //     value: APP_VERSION,
      //   },
      // ],
    })
  }, [router.pathname])
}

export default useAnalytics
