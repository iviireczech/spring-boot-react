import { LOADING_DATA, DATA_LOADED } from '../../actions/data/pendingTasks';

export default (state = 0, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return state + 1;
        case DATA_LOADED:
            return state - 1;
        default:
            return state;
    }
};
