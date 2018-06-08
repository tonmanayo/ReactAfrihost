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
        case ADD_PRODUCT: {
            console.log(state.products);
            let products = state.products;
            products.push({
                _id: action._id,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                friendlyName: action.friendlyName,
                isPaused: action.isPaused,
                status: action.status,
                uid: action.uid
            });
            return {
                ...state,
                products: products
            }
        }
        case 'ITEMS_FETCH_DATA_SUCCESS': {
            console.log(action.products);
            return {
                ...state,
                products: action.products
            }
        }
        default: return state
    }
}