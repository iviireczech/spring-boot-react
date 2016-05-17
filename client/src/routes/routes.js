import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../containers/app/App'
import Home from '../containers/home/Home'
import NotFound from '../containers/not-found/NotFound'

export default function createRoutes() {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="*" component={NotFound}/>
        </Route>
    );
}
