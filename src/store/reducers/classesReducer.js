import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: false
};


// const addIngredient = ( state, action ) => {
//     const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
//     const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
//     const updatedState = {
//         ingredients: updatedIngredients,
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//     }
//     return updateObject( state, updatedState );
// };

// const removeIngredient = (state, action) => {
//     const updatedCl = { [action.className]: state.classes[action.className] - 1 }
//     const updatedClass = updateObject( state.classes, updatedIng );
//     const updatedSt = {
//         ingredients: updatedIngs,
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//     }
//     return updateObject( state, updatedSt );
// };


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        // case actionTypes.ADD_CLASS: return addIngredient( state, action );
        // case actionTypes.REMOVE_CLASS: return removeIngredient(state, action);
        default: return state;
    }
};

export default reducer;