import { CitiesName } from '../const/const';
import { createReducer } from '@reduxjs/toolkit';
import { filterOffers, pickCity } from './action';
import { initialStateType } from '../types/initial-state';
import { offers } from '../mocks/offers';


const START_CITY_NAME = 'Paris';

const initialState: initialStateType = {
  cityName: CitiesName.PARIS,
  offers: offers.filter((offer) => offer.city.name === START_CITY_NAME),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pickCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(filterOffers, (state) => {
      state.offers = offers.filter((offer)=> offer.city.name === state.cityName);
    });
});
