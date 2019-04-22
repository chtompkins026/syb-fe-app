import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const reducer = (state= {}, action) => {
  switch(action.type){
    case actionTypes.SET_LOADING:
      return updateObject(state, {loading: action.payload})
    default:
      return state
  }
}


export default reducer ;