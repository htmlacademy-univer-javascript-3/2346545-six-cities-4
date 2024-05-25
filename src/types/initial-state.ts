import { Offer } from './offer';

export type initialStateType = {
    cityName: string | null;
    offers: Offer[];
	filteredOffers: Offer[];
    isOffersDataLoading: boolean;
  }
