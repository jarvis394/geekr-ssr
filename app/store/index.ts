import { createStore, applyMiddleware, Middleware, Store } from 'redux'
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

export type RootState = ReturnType<typeof reducers>

let store: Store

const initStore = (initialState: Partial<RootState>) => {
  const middlewares: Middleware[] = [thunkMiddleware]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ collapsed: true }))
  }

  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const wrapper = createWrapper<Store<State>>(initStore, {debug: true})

// export const initializeStore = (preloadedState) => {
//   let _store = store ?? initStore(preloadedState)

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     })
//     // Reset the current store
//     store = undefined
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store
//   // Create the store once in the client
//   if (!store) store = _store

//   return _store
// }
