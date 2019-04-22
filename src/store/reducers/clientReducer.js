import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  user: {}, 
  clientId:"",
  clientData: {
    bookings: []
  }
};
 
const setClient = (state, action) => {
  return updateObject( state, {
      clientData: action.clientData
  } );
};

const fetchClientFailed = (state, action) => {
  return updateObject( state, { error: true } );
};
const removedClass = (state, action) => {
  return updateObject(state, {clientData: updateObject(state.clientData, {bookings: state.clientData.bookings.filter((booking) => booking.id !== action.bookingId)})})
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_SUCCESSFUL:
      return {
        ...state,
        ...action.payload
      }
    case actionTypes.REMOVE_ACCESS_TOKEN: 
        return {
          ...state,
          user: {},
          accessToken: ""
      }
    case actionTypes.SET_CLIENT: return setClient(state, action);    
    case actionTypes.FETCH_CLIENT_FAILED: return fetchClientFailed(state, action);
    case actionTypes.REMOVE_CLASS:
    return removedClass(state, action)
    }
    
    return state;
  }; 

  export default reducer;