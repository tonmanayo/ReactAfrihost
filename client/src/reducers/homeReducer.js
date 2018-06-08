import {SIGNIN_SUCCESS} from "../actions/homeActions";
import {ITEMS_HAS_ERRORED} from "../actions/productActions";

const initialHomeState = {
    error: '',
    signedIn: false
};

export function homeReducer(state = initialHomeState, action) {
    switch (action.type) {
        case ITEMS_HAS_ERRORED: {
            return {
                ...state,
                error: "" + action.error
            }
        }
        case SIGNIN_SUCCESS: {
            return {
                ...state,
                signedIn: true
            }
        }
        default: return state
    }
}