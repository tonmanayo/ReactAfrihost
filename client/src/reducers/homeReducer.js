import {LOGIN_SUCCESS, LOGIN_MESSAGE, SIGNUP_MESSAGE} from "../actions/homeActions";


const initialHomeState = {
    loginMessage: '',
    loggedin: false,
    signedupMessage: ''
};

export function homeReducer(state = initialHomeState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loggedin: true
            }
        }
        case LOGIN_MESSAGE: {
            return {
                ...state,
                loginMessage: "" + action.message
            }
        }
        case SIGNUP_MESSAGE: {
            return {
                ...state,
                signedupMessage: "" + action.message
            }
        }
        default: return state
    }
}