import './styles.css';

function Header({ children, user, onUpdateUser }) {

  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({name: 'Максим', about: 'Ментор'})
  }

  return (
    <header className="header">
      <div className="container">
        {user?.email && <span>{user.email}</span>}
        {user?.name && <span>{user.name}</span>}
        <button onClick={handleClickButtonEdit} className='btn'>Изменить</button>
        <div className="header__wrapper">{children}</div>
      </div>
    </header>
  );
}

export default Header;
