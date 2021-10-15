import { RootState, initializeStore } from 'app/store'
import { useMemo } from 'react'

const useStore = (initialState: Partial<RootState>) => {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export default useStore
