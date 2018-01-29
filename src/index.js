import React from 'react';
import { render } from 'react-dom';

import './db';
import App from './containers/app-container';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import Perf from 'react-addons-perf';

// Is this still necessary?
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const isDevEnv = process.env.NODE_ENV === "development";
var getComposeEnhancers = () => {
  if (window.navigator.userAgent.includes('Chrome') && isDevEnv) {

    window.Perf = Perf
    
    return compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  } else {
    return compose(applyMiddleware(thunk),autoRehydrate());
  }
};

var store = createStore(reducer, getComposeEnhancers() );

// persistStore(store, {storage: localForage, whitelist: ["chetPhrases", "babyChetPhrases", "profile"]});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)




