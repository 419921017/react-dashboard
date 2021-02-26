import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducer'

import { defaultState as editorDefaultState, IEditStore } from '../views/Editor/store'
import { defaultState as userDefaultState, IUserState } from '../views/User/store/reducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export interface IRootDefaultState {
  user: IUserState
  editor: IEditStore
  get: (key: any) => any
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
