import { INFO_REQUEST, INFO_SUCCESS, INFO_FAILURE } from '../../actions/info/info';

export default function info(state = {
    isFetching: false
}, action) {
    switch (action.type) {
        case INFO_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case INFO_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload.data
            });
        case INFO_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.payload.error
            });
        default:
            return state
    }
}