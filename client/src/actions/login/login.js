import config from '../../config/config'
import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import { push } from 'react-router-redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(credentials) {
    return {
        type: LOGIN_REQUEST,
        payload: {
            credentials: credentials
        }
    }
}

function receiveLogin(access_token) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            access_token: access_token
        }
    }
}

function loginError(response) {
    return {
        type: LOGIN_FAILURE,
        payload: {
            error: {
                status: response.status,
                statusText: response.statusText
            }
        }
    }
}

export function loginUser(credentials, redirect) {

    let requestConfig = {
        method: 'post',
        baseURL: config.apiUrl,
        url: '/oauth/token',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            grant_type: 'password',
            scope: 'read+write',
            username: credentials.username,
            password: credentials.password
        },
        transformRequest: (data) => formurlencoded(data),
        auth: {
            username: config.clientId,
            password: config.clientSecret
        },
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    };

    return dispatch => {
        dispatch(requestLogin(credentials));
        return axios(requestConfig)
            .then((response) =>  {
                if (response.status !== 200) {
                    dispatch(loginError({status: response.status, statusText: response.data.error_description}));
                }
                else {
                    dispatch(receiveLogin(response.data.access_token));
                    localStorage.setItem('access_token', response.data.access_token);
                    dispatch(push(redirect || '/info'));
                }
            })
            .catch(error => dispatch(loginError({status: 500, statusText: error.message})));
    }
}