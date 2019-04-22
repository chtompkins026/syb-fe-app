import * as actionTypes from './actions';

const initialState = {
  user: {}, 
  clientId:""
};
 
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
    }
    
    return state;
  }; 

  export default reducer;