import { Actions, AppRoute } from '../const/const';
import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction<AppRoute>(Actions.REDIRECT_ROUTE);
