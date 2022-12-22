import './styles.css';
import { ReactComponent as SearchIcon } from '../../assets/images/ic-search.svg';
import { ReactComponent as CloseIcon } from '../../assets/images/ic-close-input.svg';

function Search({onSubmit, onInput}) {

  return (
    <form className="search" onSubmit={onSubmit}>
      <input onInput={(e) => onInput(e.target.value)} type="text" className="search__input" placeholder="Поиск" />
      <button className="search__btn">
        <SearchIcon />
        {false && <CloseIcon />}
      </button>
    </form>
  );
}

export default Search;
