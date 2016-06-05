import config from '../config/config';
import formurlencoded from 'form-urlencoded';
import axios from 'axios';

function fetch(credentials) {

    let axiosConfig = {
        url: config.tokenEndpointUrl,
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        transformRequest: (data) => formurlencoded(data),
        data: {
            grant_type: 'password',
            scope: 'read+write',
            username: credentials.username,
            password: credentials.password
        },
        auth: {
            username: config.clientId,
            password: config.clientSecret
        },
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    };

    return axios(axiosConfig);

}

export const CALL_TOKEN_ENDPOINT = Symbol('Call Token Endpoint');

export default store => next => action => {

    const callTokenEndpoint = action[CALL_TOKEN_ENDPOINT];

    // So the middleware doesn't get applied to every single action
    if (typeof callTokenEndpoint === 'undefined') {
        return next(action)
    }

    let { credentials, types } = callTokenEndpoint;

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_TOKEN_ENDPOINT];
        return finalAction;
    }

    const [ requestType, successType, failureType ] = types;
    next(
        actionWith({
            type: requestType
        })
    );

    try {
        return fetch(credentials)
            .then((response) => {
                if (response.status !== 200) {
                    next(
                        actionWith({
                            payload: {
                                errorMessage: response.data.error_description || response.statusText
                            },
                            type: failureType
                        })
                    )
                }
                else {
                    localStorage.setItem('access_token', response.data.access_token);
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
            .catch(error =>
                next(
                    actionWith({
                        payload: {
                            errorMessage: error.statusText || 'Something bad happened'
                        },
                        type: failureType
                    })
                )
            );
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