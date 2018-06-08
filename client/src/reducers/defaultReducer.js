import {HANDLE_TEXT_CHANGE} from "../actions/defaultActions";

export function defaultReducer(state = [], action) {
    switch (action.type) {
        case HANDLE_TEXT_CHANGE: {
            return {
                ...state,
                [action.newTextValue.target.name]: action.newTextValue.target.value
            }
        }
        default: return state
    }
}

