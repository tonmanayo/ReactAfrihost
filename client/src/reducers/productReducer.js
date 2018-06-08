import {
    ITEMS_ADD_DATA_SUCCESS,
    ITEMS_DELETE_DATA_SUCCESS,
    ITEMS_FETCH_DATA_SUCCESS
} from "../actions/productActions";

export function productReducer(state = {products: []}, action) {
    switch (action.type) {
        case ITEMS_FETCH_DATA_SUCCESS: {
            return {
                ...state,
                products: action.products
            }

        }
        case ITEMS_ADD_DATA_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.products]
            };
        case ITEMS_DELETE_DATA_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => action.products._id !== product._id)

            };
        default: return state
    }
}
