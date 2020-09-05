import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './state/store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();