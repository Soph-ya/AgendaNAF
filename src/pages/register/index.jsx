import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import accountingg from "../../img/accountingg.jpg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");

  const validarCampos = () => {
    if (
      !email ||
      !senha ||
      !confirmarSenha ||
      !nome ||
      !cidade ||
      !dataNascimento ||
      !tipoUsuario
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    if (senha !== confirmarSenha) {
      alert("A senha e a confirmação de senha não correspondem.");
      return false;
    }

    return true;
  };

  const salvarUsuario = (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      return;
    }

    const novoUsuario = {
      email,
      senha,
      nome,
      cidade,
      dataNascimento,
      tipoUsuario,
      id: new Date().getTime(),
      matricula: tipoUsuario === "Aluno" ? matricula : undefined,
      cpf: tipoUsuario === "Cliente" ? cpf : undefined,
    };

    try {
      const usuariosAtuais = JSON.parse(localStorage.getItem("usuarios")) || [];
      localStorage.setItem(
        "usuarios",
        JSON.stringify([...usuariosAtuais, novoUsuario])
      );

      alert("Usuário cadastrado com sucesso");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o usuário");
    }
  };

  return (
    <>
      <Header isWhite />
      <div
        className="register"
        style={{
          backgroundImage: `url(${accountingg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container_geral_registro">
          <div className="container_registro">
            <h1 className="titulo">Registro</h1>
            <form className="form" onSubmit={salvarUsuario}>
              <div className="campo-register">
                <label className="label-register" htmlFor="email">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="campo-register">
                <label className="label-register" htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="campo-register">
                <label className="label-register" htmlFor="cidade">
                  Cidade
                </label>
                <input
                  type="text"
                  name="cidade"
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>

              <div className="campo-register">
                <label className="label-register" htmlFor="dataNascimento">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  id="dataNascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>

              <div className="campo-register">
                <select
                  name="tipoUsuario"
                  id="tipoUsuario"
                  value={tipoUsuario}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                  style={{ fontSize: "18px", height: "45px", color: "blue" }}
                >
                  <option value="" disabled hidden>
                    Tipo de Usuário
                  </option>
                  <option value="Aluno">Aluno</option>
                  <option value="Professor">Professor</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </div>

              {(tipoUsuario === "Aluno" || tipoUsuario === "Professor") && (
                <div className="campo-register">
                  <label className="label-register" htmlFor="matricula">
                    Matrícula
                  </label>
                  <input
                    type="text"
                    name="matricula"
                    id="matricula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                  />
                </div>
              )}

              {tipoUsuario === "Cliente" && (
                <div className="campo-register">
                  <label className="label-register" htmlFor="cpf">
                    CPF
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => {
                      const cpfValue = e.target.value.replace(/\D/g, "");
                      const formattedCpf = cpfValue
                        .slice(0, 11)
                        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                      setCpf(formattedCpf);
                      if (!/^\d+$/.test(cpfValue)) {
                        e.target.classList.add("erro-input");
                      } else {
                        e.target.classList.remove("erro-input");
                      }
                    }}
                  />
                  {/^\d+$/.test(cpf) ? null : (
                    <p className="mensagem-erro">*somente números</p>
                  )}
                </div>
              )}
              <div className="campo-register">
                <label className="label-register" htmlFor="senha">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <div className="campo-register">
                <label className="label-register" htmlFor="confirmarSenha">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  name="confirmarSenha"
                  id="confirmarSenha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
              <div className="botao-register">
                <button className="btn_register" type="submit">
                  Registrar
                </button>
              </div>
              <div className="login-div">
                <span className="mensagem-login">
                  Já tem conta?
                  <Link to="/login">Faça login!</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
