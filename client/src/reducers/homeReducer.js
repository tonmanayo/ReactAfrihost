import {HANDLE_ERROR} from "../actions/homeActions";

const initialHomeState = {
    error: ''
};

export function homeReducer(state = initialHomeState, action) {
    switch (action.type) {
        case HANDLE_ERROR: {
            return {
                ...state,
                error: "" + action.newErrorValue
            }
        }
        default: return state
    }
}