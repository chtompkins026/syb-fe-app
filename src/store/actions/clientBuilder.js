import * as actionTypes from './actionTypes';
import axios from "axios";
import { axiosInstance } from "../../services";
import { setLoading } from './spinnerBuilder'


export const removedClass = ( bookingId ) => {
    return {
        type: actionTypes.REMOVE_CLASS,
        bookingId
    };
};

export const setClient = ( clientData ) => {
    return {
        type: actionTypes.SET_CLIENT,
        clientData
    };
};

export const fetchClientFailed = () => {
    return {
        type: actionTypes.FETCH_CLIENT_FAILED
    };
};

export const initClient = () => {
    return dispatch => {
      const id = localStorage.getItem("clientID"); 
      dispatch(setLoading(true));
      axiosInstance
        .get(`/api/clients/${id}`) 
            .then( response => {
                dispatch(setLoading(false));
               dispatch(setClient(response.data));
            } )
            .catch( error => {
                dispatch(setLoading(false));
                dispatch(fetchClientFailed());
            } );
    };
};

export const removeClass = (bookingId) => {
    console.log('C')
    return dispatch => {
        const id = localStorage.getItem("clientID"); 
        dispatch(setLoading(true));
        axiosInstance
          .delete(`/api/bookings/${bookingId}`) 
              .then( response => {
                  console.log('D')
                dispatch(setLoading(false));
                 dispatch(removedClass(bookingId));
              } )
              .catch( error => {
                dispatch(setLoading(false));
                  dispatch(fetchClientFailed());
              } );
      };
      console.log('E')
}