import config from '../config/config';
import axios from 'axios';

function fetch(endpoint, method, body, authenticated) {

    let token = localStorage.getItem('access_token') || null;
    let axiosConfig = {
        baseURL: config.apiUrl,
        url: endpoint,
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        data: body,
        transformRequest: (data) => JSON.stringify(data),
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    };

    if(authenticated) {
        if(token) {
            Object.assign(
                axiosConfig,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
        }
        else {
            throw "No token saved!"
        }
    }
    
    return axios(axiosConfig);
    
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
    
    const callAPI = action[CALL_API];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, method, body, authenticated, types } = callAPI;

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [ requestType, successType, failureType ] = types;
    next(
        actionWith({
            type: requestType
        })
    );

    try {
        return fetch(endpoint, method, body, authenticated)
            .then((response) => {
                if (response.status !== 200) {
                    next(
                        actionWith({
                            payload: {
                                errorMessage: error.statusText || response.statusText
                            },
                            type: failureType
                        })
                    )
                }
                else {
                    next(
                        actionWith({
                            payload: {
                                data: response.data
                            },
                            type: successType
                        })
                    )
                }
            })
            .catch(error => next(
                actionWith({
                    payload: {
                        errorMessage: error.statusText || 'Something bad happened'
                    },
                    type: failureType
                })
            ));
    } catch(error) {
        next(
            actionWith({
                payload: {
                    errorMessage: error.message
                },
                type: failureType
            })
        )
    }
}