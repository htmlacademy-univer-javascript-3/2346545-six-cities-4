import OfferCard from '../offer-card/OfferCard';
import { Offer } from '../../types/offer';

type OffersListProps = {
    offers: Offer[];
    setActiveOfferId(id:number): void;
    isMainScreen: boolean;
};

export default function OffersList({ offers, setActiveOfferId, isMainScreen }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard isMainScreen={isMainScreen} onCardMouseOver = {setActiveOfferId} key={offer.id} offer={offer}/>)};
    </div>
  );
}
