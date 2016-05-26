import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../containers/app/App'
import Home from '../containers/home/Home'
import Info from '../containers/info/Info'
import Login from '../containers/login/Login'
import NotFound from '../containers/not-found/NotFound'

export default function createRoutes(store) {

    const requireLogin = (nextState, replace) => {
        const { authentication: { isAuthenticated }} = store.getState();
        if (!isAuthenticated) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    };

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>

            <Route onEnter={requireLogin}>
                <Route path="info" component={Info}/>
            </Route>

            <Route path="login" component={Login}/>

            <Route path="*" component={NotFound}/>
        </Route>
    );
}
