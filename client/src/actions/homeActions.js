import {parseJSON} from "../utils/util";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_MESSAGE = 'LOGIN_MESSAGE';
export const SIGNUP_MESSAGE = 'SIGNUP_MESSAGE';

export const homeActions = {
    login(username, password) {
        return (dispatch) => {
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
                    return response;

                })
                .then(parseJSON)
                .then((token) =>
                    dispatch(authApiCall.loginSuccess(token))
                )
                .catch((error) => dispatch(authApiCall.loginError(error)));
        };
    },
};

export const authApiCall = {
    loginError(message) {
        return {
            type: LOGIN_MESSAGE,
            message: message
        }
    },
    signupError(message) {
        return {
            type: SIGNUP_MESSAGE,
            message: message
        }
    },
    loginSuccess(token) {
        return {
            type: LOGIN_SUCCESS,
            token

        }
    }
};