import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { ReviewType } from '../../types/review';
import { useAppSelector } from '../../hooks/index';

import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import LoginScreen from '../../pages/login-page/login-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
    reviews: ReviewType[];
}

export default function App({ reviews }: AppScreenProps): JSX.Element {
  const offers = useAppSelector((state)=>state.offers);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Root}
            element={<MainScreen offers={offers}/>}
          />

          <Route
            path={AppRoute.Login}
            element={<LoginScreen/>}
          />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.Offer}
            element={<OfferScreen offers={offers} reviews={reviews}/>}
          />

          <Route
            path="*"
            element={<NotFoundScreen/>}
          />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
