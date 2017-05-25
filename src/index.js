import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './db';
import './index.css';
import App from './containers/app-container';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

// Is this still necessary?
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const isDevEnv = process.env.NODE_ENV === "development";
var getComposeEnhancers = () => {
  if (window.navigator.userAgent.includes('Chrome') && isDevEnv) {
    return compose(
      applyMiddleware(thunk)
      ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return compose(applyMiddleware(thunk) );
};

var store = createStore(reducer, getComposeEnhancers() );

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
