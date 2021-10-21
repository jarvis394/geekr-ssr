import { createStore, applyMiddleware, Middleware, Store } from 'redux'
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

export type RootState = ReturnType<typeof reducers>
export type RootStore = Store<RootState>

const makeStore: MakeStore<RootStore> = (_context: Context) => {
  const middlewares: Middleware[] = [thunkMiddleware]

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    middlewares.push(createLogger({ collapsed: true }))
  }

  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
}

export const wrapper = createWrapper<RootStore>(makeStore, {
  debug: false,
})
