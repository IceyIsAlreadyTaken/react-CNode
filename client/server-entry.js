import React from 'react';
import { useStaticRendering } from 'mobx-react';
import { StaticRouter } from 'react-router-dom';
import App from './views/app';

import createStoreMap from './store/store';

useStaticRendering(true);

export default (stores, routerContex, url) => (
  // <Provider>
  <StaticRouter context={routerContex} location={url}>
    <App />
    {JSON.stringify(stores)}
  </StaticRouter>
  // </Provider>
);


export {
  createStoreMap,
};
