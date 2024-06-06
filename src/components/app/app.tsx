import { AppRoute } from '../../const/const';
import { getCurrentOfferDataLoadingStatus } from '../../store/current-offer-data/selectors';
import { getOffersDataLoadingStatus } from '../../store/offers-data/selectors';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';

import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import LoadingScreen from '../../pages/loading-page/loading-page';
import LoginScreen from '../../pages/login-page/login-page';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';


export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isCurrenOfferDataLoading = useAppSelector(getCurrentOfferDataLoadingStatus);

  if (isOffersDataLoading || isCurrenOfferDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <Routes>

        <Route
          path={AppRoute.Root}
          element={<MainScreen/>}
        />

        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />

        <Route
          path={AppRoute.Favorites}
          element={
	        <PrivateRoute>
	          <FavoritesScreen/>
	        </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element={<OfferScreen/>}
        />

        <Route
          path="*"
          element={<NotFoundScreen/>}
        />

      </Routes>
    </HelmetProvider>
  );
}
