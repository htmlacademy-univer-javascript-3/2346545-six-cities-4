import { getCityName } from '../../store/offers-data/selectors';
import { getSortType } from '../../store/page-events/selectors';
import { Offer } from '../../types/offer';
import { sortOffers } from '../../const/utils';
import { useAppSelector } from '../../hooks';
import { useMemo } from 'react';

import OffersList from '../offers-list/offers-list';
import SortingTypeForm from '../sorting-type-form/sorting-type-form';


type offersBoardProps = {
    offers: Offer[];
}

export default function OffersBoard({offers}: offersBoardProps) {
  const currentCity = useAppSelector(getCityName);
  const sortType = useAppSelector(getSortType);
  const sortedOffers = useMemo(() => sortOffers(offers, sortType), [offers, sortType]);

  return(
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {currentCity}</b>
      <SortingTypeForm />

      <div className="cities__places-list places__list tabs__content">
        <OffersList offers={sortedOffers} isMainScreen />

      </div>
    </section>
  );
}
