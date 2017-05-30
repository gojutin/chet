import React from 'react';
import { render } from 'react-dom';

import './db';

// css
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './containers/app-container';


// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
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
      offline(offlineConfig)
    );
  } else {
    return compose(applyMiddleware(thunk),offline(offlineConfig));
  }
  
};

var store = createStore(reducer, getComposeEnhancers() );

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)




