import { getRatingStars } from '../../const/utils';
import { Offer } from '../../types/offer';
import { setOfferFavoriteStatusAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';


type FavoritesCardProps = {
    offer: Offer;
}

export default function FavoritesCard({offer}: FavoritesCardProps): JSX.Element {
  const {isFavorite, isPremium, previewImage, price, title, type, rating, id} = offer;
  const dispatch = useAppDispatch();
  const favoriteStatus = `${+!isFavorite}`;
  const handleFavoriteButtonClick = () => {
    dispatch(setOfferFavoriteStatusAction({id, favoriteStatus}));
  };

  return (
    <article className="favorites__card place-card">
      <div className="place-card__mark">
        <span>{isPremium ? 'Premium' : ''}</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} onClick={handleFavoriteButtonClick} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingStars(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offers/${id}`} state={offer}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
