const initialState = true

export const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return !state
    default:
      return state
  }
}
