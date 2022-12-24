import './styles.css';
import {ReactComponent as Save} from '../../assets/images/save.svg';
import { isLiked } from '../../utils/product';

const Card = ({name, price, _id, likes, discount, wight, pictures, onProductLike, currentUser}) => {
  const discount_price =  Math.round(price - (price * discount / 100))

 
  const liked = isLiked(likes, currentUser._id)
 

  function handleLikeClick() {
    onProductLike({_id, likes})
  }

  return (
    <div className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && <span className="card__discount">-{discount}%</span>}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button className={liked ? "card__favorite_is-active" : "card__favorite"} onClick={handleLikeClick}>
          <Save className="card__favorite-icon" />
        </button>
      </div>

      <a href="/product" className="card__link">
        <img src={pictures} alt="" className="card__image" />
        <div className="card__desc">
          <span className={discount !== 0 ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>
          {discount !== 0 && <span className="card__price card__price_type_discount">{discount_price}&nbsp;₽</span>}
          <span className="card__wight">{wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </a>
      <a href="#" className="card__cart btn btn_type_primary">
        В корзину
      </a>
    </div>
  );
};

export default Card;
