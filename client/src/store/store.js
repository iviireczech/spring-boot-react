import {createStore} from 'redux'

import reducers from '../reducers/reducers';

export default function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState,
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/reducers', () => {
            const reducers = require('../reducers/reducers').default;
            store.replaceReducer(reducers);
        });
    }

    return store;

}