const HANDLE_TEXT_CHANGE = 'HANDLE_TEXT_CHANGE';
const HANDLE_ERROR = 'HANDLE_ERROR';

const initialState = {
    username: '',
    password:'',
    error: ''
};

export const actions = {
    handleTextChanged(newTextValue) {
        return {
            type: HANDLE_TEXT_CHANGE,
            newTextValue
        }
    },
    handleNewError(newErrorValue) {
        return {
            type: HANDLE_ERROR,
            newErrorValue
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_TEXT_CHANGE: {
            return {
                ...state,
                [action.newTextValue.target.name]: action.newTextValue.target.value
            }
        }
        case HANDLE_ERROR: {
            return {
                ...state,
                error: "" + action.newErrorValue
            }
        }
        default: return state
    }
}
