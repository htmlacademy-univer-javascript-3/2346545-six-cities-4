import { Offer } from './offer';
import { ReviewType } from './review';

export type initialStateType = {
    cityName: string | null;
    offers: Offer[];
	filteredOffers: Offer[];
    isOffersDataLoading: boolean;
	authorizationStatus: string;
    userEmail: string;
    error: string | null;
	currentOffer: {
		offerInfo: Offer | null;
		comments: ReviewType[];
		nearbyOffers: Offer[];
		isCommentDataSending: boolean;
      };
      isCurrentOfferDataLoading: boolean;
  }
