export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logoutUser() {

    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('access_token');
        dispatch(receiveLogout());
    }
}