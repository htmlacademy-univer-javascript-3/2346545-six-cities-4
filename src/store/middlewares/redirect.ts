import { browserHistory } from '../../browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { PayloadAction } from '@reduxjs/toolkit';


type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'REDIRECT_ROUTE') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
