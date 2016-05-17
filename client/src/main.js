import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/store';
import createRoutes from './routes/routes';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes();

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
), document.getElementById('app'));
