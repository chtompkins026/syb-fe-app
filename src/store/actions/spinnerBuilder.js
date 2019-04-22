import * as actionTypes from './actionTypes';

export const setLoading = (loadingState) => ({
  type: actionTypes.SET_LOADING,
  payload: loadingState
})