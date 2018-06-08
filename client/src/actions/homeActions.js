import {parseJSON} from "../utils/util";
import {ITEMS_HAS_ERRORED, ITEMS_IS_LOADING} from "./productActions";

export const HANDLE_ERROR = 'HANDLE_ERROR';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';

export const homeActions = {
    handleNewError(newErrorValue) {
        return {
            type: HANDLE_ERROR,
            newErrorValue
        }
    },
    signIn(username, password) {
        return (dispatch) => {
            dispatch(authApiCall.itemsIsLoading(true));
            fetch('http://localhost:3001/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })})
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(authApiCall.itemsIsLoading(false));
                    return response;
                })
                .then(parseJSON)
                .then((token) =>
                    dispatch(authApiCall.successfullyLoggedIn(token))
                )
                .catch((error) => dispatch(authApiCall.itemsHasErrored(error)));
        };
    },
};

export const authApiCall = {
    itemsHasErrored(error) {
        return {
            type: ITEMS_HAS_ERRORED,
            error
        }
    },
    itemsIsLoading(bool) {
        return {
            type: ITEMS_IS_LOADING,
            isLoading: bool
        }
    },successfullyLoggedIn(token) {
        return {
            type: SIGNIN_SUCCESS,
            token

        }
    }
};