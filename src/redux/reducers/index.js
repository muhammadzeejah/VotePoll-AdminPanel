import { combineReducers } from 'redux'
import { PartiesReducer, GetParty } from './partiesReducer'
import { changeState } from './sidebarReducer'

export const reducers = combineReducers({
  PartiesReducer,
  GetParty,
  changeState,
})
