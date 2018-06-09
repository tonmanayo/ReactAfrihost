import {
    ITEMS_ADD_DATA_SUCCESS,
    ITEMS_DELETE_DATA_SUCCESS,
    ITEMS_FETCH_DATA_SUCCESS, ITEMS_HAS_ERRORED, LOGOUT
} from "../actions/productActions";

const initialHProductsState = {
    products: [],
    errorMessage: ''
};

export function productReducer(state = initialHProductsState, action) {
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
        case ITEMS_HAS_ERRORED: {
            return {
                ...state,
                errorMessage: "" + action.message
            };
        }
        case LOGOUT: {
            return {
                ...state,
                loggedin: false
            };
        }
        default: return state
    }
}
