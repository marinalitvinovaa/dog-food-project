import './styles.css';
import logo from '../../assets/images/logo.svg'

function Logo({className, href, ...props}) {
  return (
    <a href={href ? href : '#'} className={className ? className : 'logo' } {...props}>
      <img className='logo__pic' src={logo} alt="Логотип" />
    </a>
  );
}

export default Logo;
