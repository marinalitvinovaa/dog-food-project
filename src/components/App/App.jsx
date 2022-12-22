import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../Header/Header';
import Sort from '../Sort/Sort';
import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import SearchInfo from '../SearchInfo/SearchInfo';
import data from '../../assets/data.json';

function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setsearchQuery] = useState('');

//функция фильтрации
  const handleRequest = () => {
    const filterCards = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setCards(prevState => filterCards);
  }

  //функция для отправки строки поиска
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest()
  }

  useEffect(() => {
    handleRequest()
  },[searchQuery])

  // изменение состояния searchQuery 
  const handleInputChange = (inputValue) => {
    setsearchQuery(inputValue)
  }
  
  return (
    <>
      <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className="content container">
        <SearchInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />
        <div className="content__cards">
          <CardList goods={cards} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
