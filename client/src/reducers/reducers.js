import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authentication from './authentication/authentication';
import pendingTasks from './data/pendingTasks';

export default combineReducers({
    authentication: authentication,
    pendingTasks: pendingTasks,
    routing: routerReducer
});