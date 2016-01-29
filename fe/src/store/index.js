import { createStore, applyMiddleware, compose } from 'redux';
import middleware from 'middleware';
import reducer from 'reducers';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';

/**
 * Redux Store
 * @return     {Object} store redux store used to store data across the entire app
 */
export default function configureStore() {
  let finalCreateStore;
  if (__PROD__) {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  } else {
    // for development add dev-tools;
    const { devTools, persistState } = require('redux-devtools');

    // enhance store with dev-tools and persistence functionality
    finalCreateStore = compose(
        applyMiddleware(...middleware),
        reduxReactRouter({ createHistory }),
        devTools(),
        persistState(
            window.location.href.match(/[?&]debug_session=([^&]+)\b/)
        )
    )(createStore);
  }

  const store = finalCreateStore(reducer);
  if (__DEV__ && module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
