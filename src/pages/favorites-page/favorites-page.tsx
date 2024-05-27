import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty';
import { getFavoriteOffers } from '../../store/favorite-offers-data/selectors';
import { useAppSelector } from '../../hooks';

import FavoritesList from '../../components/favorites-list/favorites-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';


export default function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <div className="page">
      <Header/>
      {!favoriteOffers.length ? <FavoritesEmpty/> :
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <FavoritesList />
              </ul>
            </section>
          </div>
        </main>}
      <Footer/>
    </div>
  );
}
