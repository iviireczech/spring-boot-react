import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authentication from './authentication/authentication'

export default combineReducers({
    authentication: authentication,
    routing: routerReducer
});