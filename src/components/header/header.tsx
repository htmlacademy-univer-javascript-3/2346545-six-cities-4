import { AuthorizationStatus } from '../../const/const';
import { fetchFavoriteOffersAction, logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/authorization-user-process/selectors';
import { getFavoriteOffers } from '../../store/favorite-offers-data/selectors';
import { getUserEmail } from '../../services/user-email';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import React from 'react';


function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const dispatch = useAppDispatch();
  const userEmail = getUserEmail();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            {
              authorizationStatus === String(AuthorizationStatus.Auth) &&
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" onClick={() => {
                  dispatch(fetchFavoriteOffersAction());
                }} to="/favorites"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{userEmail}</span>
                  <span className="header__favorite-count"> {favoriteOffers.length} </span>
                </Link>
              </li>
              <li className="header__nav-item" onClick={() => {
                dispatch(logoutAction());
              }}
              >
                <Link className="header__nav-link" to="#">
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </ul>
            }
            {
              authorizationStatus !== String(AuthorizationStatus.Auth) &&
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="/login">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">Sign in</span>
                </Link>
              </li>
            </ul>
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
