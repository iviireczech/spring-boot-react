import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authentication from './authentication/authentication';
import info from './info/info';

export default combineReducers({
    authentication: authentication,
    info: info,
    routing: routerReducer
});