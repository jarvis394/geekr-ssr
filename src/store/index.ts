import { createStore, applyMiddleware, Middleware, Store } from 'redux'
import { Context, createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper'

export type RootState = ReturnType<typeof reducers>
export type RootStore = Store<RootState>

export const makeStore = (_context: Context) => {
  const middlewares: Middleware[] = [
    nextReduxCookieMiddleware({
      subtrees: ['settings'],
    }),
    thunkMiddleware,
  ]

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    middlewares.push(createLogger({ collapsed: true }))
  }

  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      console.log('Replacing reducer')
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      store.replaceReducer(require('./reducers').default)
    })
  }

  return store
}

export const wrapper = createWrapper<RootStore>(wrapMakeStore(makeStore), {
  debug: false,
})
