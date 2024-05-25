import { Actions } from '../const/const';
import { createAction } from '@reduxjs/toolkit';

export const pickCity = createAction(Actions.PICK_CITY, (textContent: string | null) => ({
  payload: textContent,
}));

export const filterOffers = createAction(Actions.FILTER_OFFERS);
