import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons">
        <a href="https://www.facebook.com/feso.unifeso" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.instagram.com/feso.unifeso/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.youtube.com/channel/UCqJHUIHPOB0SkdgiVExdSjw/featured" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={20} />
        </a>
      </div>
      <div className="copyright">
        <p>Copyright © 2023. Desenvolvido por Sophia Resende de Freitas</p>
        
      </div>
    </footer>
  );
};

export default Footer;
