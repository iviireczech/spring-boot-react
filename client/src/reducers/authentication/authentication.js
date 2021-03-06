import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../actions/login/login';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../../actions/logout/logout';

export default function authentication(state = {
    isAuthenticated: localStorage.getItem('access_token') ? true : false
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                errorMessage: action.payload.errorMessage
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        default:
            return state
    }
}