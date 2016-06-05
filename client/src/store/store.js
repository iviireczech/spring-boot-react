import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import tokenEndpoint from '../middleware/token-endpoint';

import reducers from '../reducers/reducers';

export default function configureStore(initialState = {}, history) {

    const middleware = [thunk, routerMiddleware(history), tokenEndpoint];

    const enhancer = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStore(reducers, initialState, enhancer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/reducers', () => {
            const reducers = require('../reducers/reducers').default;
            store.replaceReducer(reducers);
        });
    }

    return store;

}