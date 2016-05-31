import { CALL_TOKEN_ENDPOINT } from '../../middleware/token-endpoint';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginUser(credentials) {

    return {
        [CALL_TOKEN_ENDPOINT]: {
            credentials: credentials,
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
        }
    };
    
}