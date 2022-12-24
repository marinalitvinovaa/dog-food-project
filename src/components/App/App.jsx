import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../Header/Header';
import Sort from '../Sort/Sort';
import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import SearchInfo from '../SearchInfo/SearchInfo';
// import data from '../../assets/data.json';
import api from '../../utils/api'
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setsearchQuery] = useState('');
  // const [isLiked, setIsLiked] = useState(false)

  const debounceSearchQuery = useDebounce(searchQuery, 300)

//функция фильтрации
  const handleRequest = () => {
    // const filterCards = cards.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    // setCards(prevState => filterCards);
    api.search(debounceSearchQuery)
    .then(res => setCards(res))
    .catch(err => console.log(err))
  }

  const handleProductLike = (product) => {
    const liked = isLiked(product.like, currentUser._id)
    api.changeLikeProduct(product._id, liked)
      .then((newCard => {
        const neweProducts = cards.map(cardState => {
            return cardState._id  === newCard._id ? newCard : cardState
        })

        setCards(neweProducts)
      }))
  }

  //функция для отправки строки поиска
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest()
  }

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData.products)
        setCurrentUser(userData)
      })
  }, [])


  useEffect(() => {
    handleRequest()
  },[debounceSearchQuery])

  // изменение состояния searchQuery 
  const handleInputChange = (inputValue) => {
    setsearchQuery(inputValue)
  }

  const handleUserInfo = (userUpdateData) => {
    api.setUserInfo(userUpdateData)
    .then(res => setCurrentUser(res))
  }
  
  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUserInfo}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className="content container">
        <SearchInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />
        <div className="content__cards">
          <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
