import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx'



const root = document.getElementById('root');
const render = Component => {
    ReactDOM.render(

        <Component />
        , root)
}

render(App);


// if (module.hot) {
//     module.hot.accept('./App.jsx', () => {
//         const NextApp = require('./App.jsx').default;
//         render(NextApp);
//     })
// }