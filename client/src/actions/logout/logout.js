export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST
    }
}

function receiveLogout(errorMessage) {
    return {
        type: LOGOUT_SUCCESS,
        errorMessage: errorMessage
    }
}

export function logoutUser(errorMessage) {

    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('access_token');
        dispatch(receiveLogout(errorMessage));
    }
}