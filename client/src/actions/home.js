export const HANDLE_TEXT_CHANGE = 'HANDLE_TEXT_CHANGE';
export const HANDLE_ERROR = 'HANDLE_ERROR';

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