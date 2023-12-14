import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import accountingg from '../../img/accountingg.jpg';
import Header from "../../components/Header"
import Footer from "../../components/Footer"


export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = (e) => {
    e.preventDefault();

    const usuarios = getItem('usuarios') || [];

    const usuarioExistente = usuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioExistente) {
      setItem('usuarioLogado', {
        ...usuarioExistente,
        nome: usuarioExistente.nome,
      });

      alert('Login realizado com sucesso');
      navigate('/calendar');
    } else {
      alert('Usuário não cadastrado ou Credenciais Inválidas');
    }
  };

  return (
    <>
      <Header isWhite />
      <div className='login' style={{backgroundImage: `url(${accountingg})`, backgroundSize: 'cover'}}>
        <div className='container_geral__login'>
          <div className='container_login'>
            <h1 className="titulo">
              Log in
            </h1>
            <form className="form" onSubmit={realizarLogin}>
              <div className="campo">
                <label className='labels' htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="campo">
                <label className='labels' htmlFor="password">Senha</label>
                <input type="password" name="password" id="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
              </div>
              <div className='botao'>
                <button className='btn_login' type="submit">Entrar</button>
              </div>
            </form>
            <div className='registro'>
              <div className='registro-div'>
                <span className='mensagem'>Novo por aqui?</span>
                <Link to="/register"><a className='btn__register__login'>Registre-se</a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
