export const HANDLE_ERROR = 'HANDLE_ERROR';

export const homeActions = {
    handleNewError(newErrorValue) {
        return {
            type: HANDLE_ERROR,
            newErrorValue
        }
    }
};