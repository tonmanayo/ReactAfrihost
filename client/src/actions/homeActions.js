import {checkStatus, parseJSON} from "../utils/util";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_MESSAGE = 'LOGIN_MESSAGE';
export const SIGNUP_MESSAGE = 'SIGNUP_MESSAGE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const FOUND_USER_SUCCESS = 'FOUND_USER_SUCCESS';
export const NO_USER = 'NO_USER';

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
                })
            })
                .then(checkStatus)
                .then(parseJSON)
                .then((data) => {
                        dispatch(authApiCall.loginSuccess(data));
                        localStorage.removeItem('token');
                        localStorage.setItem('token', JSON.stringify(data['token']));
                    }
                ).catch((error) => dispatch(authApiCall.loginError(error)));
        };
    },
    signup(props) {
        return (dispatch) => {
            fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: props.username,
                    password: props.password,
                    companyName: props.companyName,
                    telNumber: props.telNumber,
                    cellNumber: props.cellNumber,
                    firstName: props.firstName,
                    lastName: props.lastName,
                    idNumber: props.idNumber,
                    faxNumber: props.faxNumber,
                })
            })
                .then(checkStatus)
                .then(parseJSON)
                .then((data) => {
                        dispatch(authApiCall.signupSuccess(data));
                        localStorage.removeItem('token');
                        localStorage.setItem('token', JSON.stringify(data['token']));
                    }
                ).catch((error) => dispatch(authApiCall.signupError(error)));
        };
    },
    findUser(userId) {
        return (dispatch) => {
            fetch('http://localhost:3001/auth/findUser/' + userId)
                .then(checkStatus)
                .then(parseJSON)
                .then((data) => {
                        dispatch(authApiCall.foundUser(data));
                    }
                ).catch(() => dispatch(authApiCall.noUser()))
        }
    }

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
    },
    signupSuccess(token) {
        return {
            type: SIGNUP_SUCCESS,
            toke: token,
            loggedin: true

        }
    },
    foundUser() {
        return {
            type: FOUND_USER_SUCCESS,
            loggedin: true

        }
    },
    noUser() {
        return {
            type: NO_USER,
            loggedin: false
        }
    }
};