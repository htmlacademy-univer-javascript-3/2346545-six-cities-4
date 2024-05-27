import { getFilteredOffers } from '../../store/offers-data/selectors';
import { MainEmpty } from '../../components/main-empty/main-empty';
import { useAppSelector } from '../../hooks';

import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import OffersBoard from '../../components/offers-board/offers-board';
import Map from '../../components/map/map';


export default function MainScreen(): JSX.Element {
  const offers = useAppSelector(getFilteredOffers);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          { !offers.length ? <MainEmpty /> :
            <div className="cities__places-container container">
              <OffersBoard offers={offers} />
              <div className="cities__right-section">
                <Map isMainScreen offers={offers}/>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}
