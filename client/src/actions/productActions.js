import { parseJSON, checkStatus } from '../utils/util';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export const ITEMS_ADD_DATA_SUCCESS = 'ITEMS_ADD_DATA_SUCCESS';
export const ITEMS_DELETE_DATA_SUCCESS = 'ITEMS_DELETE_DATA_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const productActions = {

    logout() {
        return {
            type: LOGOUT
        }
    },
    itemsFetchData() {
        return (dispatch) => {
            fetch('http://localhost:3001/products/allPosts')
                .then(checkStatus)
                .then(parseJSON)
                .then((products) => dispatch(productsApiCall.itemsFetchDataSuccess(products['products'])))
                .catch((error) => dispatch(productsApiCall.itemsHasErrored(error)));
        };
    },
    itemsAddData(friendlyName, isPaused, status, uid) {
        return (dispatch) => {
            fetch('http://localhost:3001/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    friendlyName: friendlyName,
                    isPaused: isPaused,
                    status: status,
                    uid: uid
                })})
                .then(checkStatus)
                .then(parseJSON)
                .then((products) => dispatch(productsApiCall.itemsAddDataSuccess(products['obj'])))
                .catch((error) => dispatch(productsApiCall.itemsHasErrored(error)));
        };
    },
    itemsRemoveData(product) {
        return (dispatch) => {
            fetch('http://localhost:3001/products/delete/' + product._id)
                .then(checkStatus)
                .then(parseJSON)
                .then((products) => dispatch(productsApiCall.itemsDeleteDataSuccess(products['products'])))
                .catch((error) => dispatch(productsApiCall.itemsHasErrored(error)));
        };
    }
};

export const productsApiCall = {
    itemsHasErrored(message) {
        return {
            type: ITEMS_HAS_ERRORED,
            message: message
        }
    },
    itemsFetchDataSuccess(products) {
        return {
            type: ITEMS_FETCH_DATA_SUCCESS,
            products
        }
    },
    itemsAddDataSuccess(products) {
        return {
            type: ITEMS_ADD_DATA_SUCCESS,
            products
        }
    },
    itemsDeleteDataSuccess(products) {
        return {
            type: ITEMS_DELETE_DATA_SUCCESS,
            products
        }
    }

};