import { checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction } from './store/api-actions';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';
import React from 'react';
import ReactDOM from 'react-dom/client';


store.dispatch(checkAuthAction());
store.dispatch(fetchFavoriteOffersAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>,
);
