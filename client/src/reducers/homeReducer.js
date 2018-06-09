import {LOGIN_SUCCESS, LOGIN_MESSAGE, SIGNUP_MESSAGE, SIGNUP_SUCCESS} from "../actions/homeActions";


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
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                signedupMessage: "Successfully Signed-Up",
                loggedin: action.loggedin
            }
        }
        default: return state
    }
}