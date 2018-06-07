import {HANDLE_ERROR, HANDLE_TEXT_CHANGE} from "../actions/home";

const initialState = {
    username: '',
    password:'',
    error: '',
    cellNumber: '',
    faxNumber: '',
    firstName: '',
    lastName: '',
    idNumber: 0,
    telNumber: '',
    companyName: ''
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