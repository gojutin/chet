import React from 'react';
import { render } from 'react-dom';

import './db';
import App from './containers/app-container';

// css
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage'
import Perf from 'react-addons-perf'
window.Perf = Perf

// Is this still necessary?
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const isDevEnv = process.env.NODE_ENV === "development";
var getComposeEnhancers = () => {
  if (window.navigator.userAgent.includes('Chrome') && isDevEnv) {

    return compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      autoRehydrate()
    );
  } else {
    return compose(applyMiddleware(thunk),autoRehydrate());
  }
  
};

var store = createStore(reducer, getComposeEnhancers() );

persistStore(store, {storage: localForage});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)




