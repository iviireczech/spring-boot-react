import config from '../../config/config'
import axios from 'axios';

export const INFO_REQUEST = 'INFO_REQUEST';
export const INFO_SUCCESS = 'INFO_SUCCESS';
export const INFO_FAILURE = 'INFO_FAILURE';

function requestInfo() {
    return {
        type: INFO_REQUEST
    }
}

function receiveInfo(data) {
    return {
        type: INFO_SUCCESS,
        payload: {
            data: data
        }
    }
}

function infoError(response) {
    return {
        type: INFO_FAILURE,
        payload: {
            error: {
                status: response.status,
                statusText: response.statusText
            }
        }
    }
}

export function getInfo() {

    let requestConfig = {
        method: 'get',
        baseURL: config.apiUrl,
        url: '/api/info',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
    };

    return dispatch => {
        dispatch(requestInfo());
        return axios(requestConfig)
            .then((response) =>  {
                if (response.status !== 200) {
                    dispatch(infoError({status: response.status, statusText: response.data.statusText}));
                }
                else {
                    dispatch(receiveInfo(response.data));
                }
            })
            .catch(error => dispatch(infoError({status: 500, statusText: error.message})));
    }
}