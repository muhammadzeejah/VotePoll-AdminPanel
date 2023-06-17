import { ActionTypes } from '../constants/action-type'

const defaultState = []
export const PartiesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_PARTIES:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const initialState = []
export const GetParty = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PARTY:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
