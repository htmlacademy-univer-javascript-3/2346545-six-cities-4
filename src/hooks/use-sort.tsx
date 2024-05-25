import { compareOffersPriceDown, compareOffersPriceUp, compareOffersRatingDown } from '../const/utils';
import { Offer } from '../types/offer';
import { SortingTypes } from '../const/const';


export function useSort(offers: Offer[], sortingType: string | null) {
  const sortedOffers = [...offers];
  switch(sortingType) {
    case SortingTypes.LowToHigh:
      return sortedOffers.sort(compareOffersPriceUp);
    case SortingTypes.HighToLow:
      return sortedOffers.sort(compareOffersPriceDown);
    case SortingTypes.TopRated:
      return sortedOffers.sort(compareOffersRatingDown);
    default:
      return sortedOffers;
  }
}
