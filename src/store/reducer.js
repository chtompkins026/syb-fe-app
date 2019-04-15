import * as actionTypes from './actions';

function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        userId: action.accessToken
      }
    case actionTypes.SET_CLIENT_ID: 
      return {
        ...state, 
        clientID: action.cleintID 
      }
    case actionTypes.REMOVE_ACCESS_TOKEN: 
        return {
          ...state,
          userId: state.userId.filter(userId => userId !== action.accessToken)
      }
    case actionTypes.REMOVE_CLIENT_ID: 
      return {
        ...state, 
        clientID: state.clientID.filter(clientID => clientID !== action.cleintID)
      }
    }
    return state;
  }; 

  export default reducer;