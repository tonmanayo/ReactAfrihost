import { ADD_PRODUCT, DELETE_PRODUCT} from "../actions/productActions";

export function productReducer(state = {products: []}, action) {
    switch (action.type) {
        case DELETE_PRODUCT: {
            const filter = action.products.filter(product => {
                return product._id !== action.productId
            });
            return {
                ...state,
                products: filter
            }
        }
        case 'ITEMS_FETCH_DATA_SUCCESS': {
            return {
                ...state,
                products: action.products
            }

        }
        case 'ITEMS_ADD_DATA_SUCCESS':
            return {
                ...state,
                products: [...state.products, action.products]
            }
        default: return state
    }
}

