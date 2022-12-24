import './styles.css';
import Card from '../Card/Card.jsx'

function CardList({goods, onProductLike, currentUser}) {
  return (
    <div className='cards'>
      {
        goods.map((item) => <Card key={item._id} onProductLike={onProductLike} {...item} currentUser={currentUser}/>)  
      }
    </div>
  );
}

export default CardList;
