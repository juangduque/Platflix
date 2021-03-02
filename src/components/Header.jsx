import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import gravatar from '../utils/gravatar.js';
import { logoutRequest } from '../actions';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = props => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});
  }

  const headerClass = classNames('header',{
    // Si se cumple la condición (Que el usuario este registrado o logeado)
    // van a mostrar un valor u otro. En este caso, es para cambiar el nombre
    // de la clase y aplicarle un color de background diferente dependiendo de
    // donde se esté, ya que login y register tienen un color de background
    // diferente.
    // Todo esto solo es posible instalando el módulo npm "classnames"
    isLogin,
    isRegister,
  });

  return(
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" src={logo} alt="Platzi Video" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
        {/* Si hasUser es válido se pasa el gravatar, en caso de que no se 
        cumpla, se pasa la imagen de user por defecto. */}
        {hasUser ?
          <img src={gravatar(user.email)}  alt={user.email} />:
          <img src={userIcon} alt="" />
        }        
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ?
            <li><Link >{user.name}</Link></li>:
            null
          }
          {hasUser ?
            <li><a href="#logout" onClick={handleLogout}>Cerrar sesión</a></li>:
            <li><Link to="/login">Iniciar sesión</Link></li>
          }
        </ul>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return{
    user: state.user
  };
};

const mapDispatchToProps = {
  logoutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);