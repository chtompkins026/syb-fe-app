import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    classes: [],
    loading: false,
    purchased: false
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseClassesStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const purchaseClassesSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        classes: state.classes.concat( newOrder )
    } );
};

const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchClassesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchClassesSuccess = ( state, action ) => {
    return updateObject( state, {
        classes: action.classes,
        loading: false
    } );
};

const fetchClassesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.PURCHASE_CLASSES_START: return purchaseClassesStart( state, action );
        case actionTypes.PURCHASE_CLASSES_SUCCESS: return purchaseClassesSuccess( state, action )
        case actionTypes.PURCHASE_CLASSES_FAIL: return purchaseClassesFail( state, action );
        case actionTypes.FETCH_CLASSES_START: return fetchClassesStart( state, action );
        case actionTypes.FETCH_CLASSES_SUCCESS: return fetchClassesSuccess( state, action );
        case actionTypes.FETCH_CLASSES_FAIL: return fetchClassesFail( state, action );
        default: return state;
    }
};

export default reducer;