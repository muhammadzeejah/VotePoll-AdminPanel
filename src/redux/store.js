import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import { reducers } from './reducers/index.js'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
