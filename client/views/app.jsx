
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Routes from '../config/router';

import AppState from '../store/appState';

const store = new AppState();

const App = () => (
  <Provider store={store}>
    <Router>
      <div>This is app</div>
      <Link to="/detail">
        Detail
      </Link>
      <Link to="/">
        Home
      </Link>
      <Routes />
    </Router>
  </Provider>
);
export default hot(App);
