import { parseJSON } from '../utils/util';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';


export const productActions = {
    addProduct(friendlyName, isPaused, status, uid, _id) {
        return {
            type: ADD_PRODUCT,
            friendlyName, isPaused, status, uid, _id
        }
    },
    deleteProduct(productId) {
        return {
            type: DELETE_PRODUCT,
            productId
        }
    },
    itemsFetchData() {
        return (dispatch) => {
            dispatch(apiCall.itemsIsLoading(true));

            fetch('http://localhost:3001/products/allPosts')
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }

                    dispatch(apiCall.itemsIsLoading(false));

                    return response;
                })
                .then(parseJSON)
                .then((products) => dispatch(apiCall.itemsFetchDataSuccess(products['products'])))
                .catch(() => dispatch(apiCall.itemsHasErrored(true)));
        };
    }
};

export const apiCall = {
    itemsHasErrored(bool) {
        return {
            type: 'ITEMS_HAS_ERRORED',
            hasErrored: bool
        }
    },
    itemsIsLoading(bool) {
        return {
            type: 'ITEMS_IS_LOADING',
            isLoading: bool
        }
    },
    itemsFetchDataSuccess(products) {
        return {
            type: 'ITEMS_FETCH_DATA_SUCCESS',
            products
        }
    }

};