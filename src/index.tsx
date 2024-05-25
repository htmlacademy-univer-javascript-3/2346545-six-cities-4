import { fetchOffersAction } from './store/api-actions';
import { Provider } from 'react-redux';
import { reviews } from './mocks/reviews';
import { store } from './store';

import App from './components/app/app';
import React from 'react';
import ReactDOM from 'react-dom/client';


store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App
        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>,
);
