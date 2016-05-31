import { CALL_API } from '../../middleware/api';

export const INFO_REQUEST = 'INFO_REQUEST';
export const INFO_SUCCESS = 'INFO_SUCCESS';
export const INFO_FAILURE = 'INFO_FAILURE';

export function getInfo() {
    return {
        [CALL_API]: {
            endpoint: 'info',
            authenticated: true,
            method: 'get',
            types: [INFO_REQUEST, INFO_SUCCESS, INFO_FAILURE]
        }
    }
}