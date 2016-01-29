import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import configureStore  from 'store';
import * as TopoActions from 'actions';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import {addToken} from 'utils/request';

import Site from "./components/Site.jsx"

// create redux store for app
const store = configureStore();

class Root extends Component {
  render() {
    console.log("RENDER")
    let devTools;
    if (__DEV__) {
      // dev add dev-tools utilities
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      devTools = (<DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>);
    }
    // Redux provider
    // App routes according to rest api

    return (
      <div id="root-wrapper">
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={Site}>

            </Route>
          </ReduxRouter>
        </Provider>
        {
          devTools
        }
      </div>
    );
  }
}
export default Root;
