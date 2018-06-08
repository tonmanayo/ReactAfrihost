export const HANDLE_TEXT_CHANGE = 'HANDLE_TEXT_CHANGE';

export const defaultActions = {
    handleTextChanged(newTextValue) {
        return {
            type: HANDLE_TEXT_CHANGE,
            newTextValue
        }
    }
};