import { DEFAULT_UPDATE_INTERVAL } from 'src/config/constants'

const shouldUpdate = (storeData: {
  [key: string]: unknown
  lastUpdated: number
}) => {
  const now = Date.now()
  const shouldUpdateByTS = (d: number) => now - d >= DEFAULT_UPDATE_INTERVAL

  if (storeData && storeData?.lastUpdated) {
    return shouldUpdateByTS(storeData.lastUpdated)
  } else return true
}

export default shouldUpdate
