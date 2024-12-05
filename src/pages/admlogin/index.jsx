import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import accountingg from '../../img/accountingg.jpg';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AdmLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Email permitido
  const ADMIN_UID = import.meta.env.VITE_ADMIN_UID

  const realizarLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const userId = userCredential.user.uid;

      if (userId === ADMIN_UID) {
        alert('Login realizado com sucesso. Bem-vindo(a), administrador(a)!');
        navigate('/adm');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error.message);
      alert('Acesso negado: apenas administradores podem acessar esta página.');
    }
  };

  return (
    <>
      <Header isWhite />
      <div className='login' style={{ backgroundImage: `url(${accountingg})`, backgroundSize: 'cover' }}>
        <div className='container_geral__login'>
          <div className='container_login'>
            <h1 className="titulo">Log in</h1>
            <form className="form" onSubmit={realizarLogin}>
              <div className="campo">
                <label className='labels' htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="campo">
                <label className='labels' htmlFor="password">Senha</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <div className='botao'>
                <button className='btn_login' type="submit">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdmLogin;
