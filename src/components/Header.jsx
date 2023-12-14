import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import "./header.css";

const Header = ({ isWhite }) => {
  const headerStyle = isWhite
    ? { backgroundColor: '#fff', color: '#000' }
    : { backgroundColor: '#f0f0f0', color: '#000' };

  const linkStyle = isWhite ? { color: '#fff' } : { color: '#000' };
  const logoStyle = isWhite ? { width: '140px', height: '50px', margin: 'auto' } : { width: '140px', height: '50px' };

  return (
    <header className='header-style' style={headerStyle}>
      <Link to="/"> <img src={logo} alt="Descrição da imagem" className='logo-style' style={logoStyle} /></Link>
      {!isWhite && (
        <nav className="nav-style">
          <Link to="/login" className='link-style' style={linkStyle}>Login</Link>
          <Link to="/register" className='link-style' style={linkStyle}>Registro</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
