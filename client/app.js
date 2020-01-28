import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './views/app';
import AppState from './store/appState';


const root = document.getElementById('root');


const render = (Component) => {
  ReactDOM.render(
    <Provider store={new AppState()}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    root,
  );
};
render(App);
