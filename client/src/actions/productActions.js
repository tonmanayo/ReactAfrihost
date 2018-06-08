import { parseJSON } from '../utils/util';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export const ITEMS_ADD_DATA_SUCCESS = 'ITEMS_ADD_DATA_SUCCESS';
export const ITEMS_DELETE_DATA_SUCCESS = 'ITEMS_DELETE_DATA_SUCCESS';


export const productActions = {

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
    },
    itemsAddData(friendlyName, isPaused, status, uid) {
        return (dispatch) => {
            dispatch(apiCall.itemsIsLoading(true));

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
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(apiCall.itemsIsLoading(false));
                    return response;
                })
                .then(parseJSON)
                .then((products) => dispatch(apiCall.itemsAddDataSuccess(products['obj'])))
                .catch(() => dispatch(apiCall.itemsHasErrored(true)));
        };
    },
    itemsRemoveData(product) {
        return (dispatch) => {
            dispatch(apiCall.itemsIsLoading(true));

            fetch('http://localhost:3001/products/delete/' + product._id)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(apiCall.itemsIsLoading(false));
                    return response;
                })
                .then(parseJSON)
                .then((products) => dispatch(apiCall.itemsDeleteDataSuccess(products['products'])))
                .catch(() => dispatch(apiCall.itemsHasErrored(true)));
        };
    }
};

export const apiCall = {
    itemsHasErrored(bool) {
        return {
            type: ITEMS_HAS_ERRORED,
            hasErrored: bool
        }
    },
    itemsIsLoading(bool) {
        return {
            type: ITEMS_IS_LOADING,
            isLoading: bool
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