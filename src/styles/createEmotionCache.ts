import createCache from '@emotion/cache'

function createEmotionCache() {
  return createCache({ key: 'geekr' })
}

export default createEmotionCache
