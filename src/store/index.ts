import { createStore, applyMiddleware, Middleware, Store } from 'redux'
import { Context, createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

export type RootState = ReturnType<typeof reducers>

const makeStore = (_context: Context) => {
  const middlewares: Middleware[] = [thunkMiddleware]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ collapsed: true }))
  }

  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
}

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: false,
})
