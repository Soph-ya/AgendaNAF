import { useState } from "react";
import "./agendamento.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ptBR from "date-fns/locale/pt-BR"; 
import Modal from "react-modal";
import { FaCircleUser } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { VscCheckAll } from "react-icons/vsc";
import Header from "../../components/header";
import Footer from "../../components/Footer";

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const Agendamento = () => {
  const [dataSelecionada, setDataSeleciona] = useState(null);
  const [turnoSelecionado, setTurnoSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [botaoAtivo, setBotaoAtivo] = useState(false);
  const [agendamentoRealizado, setAgendamentoRealizado] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const usuarioLogado = getItem("usuarioLogado");

  const horariosDisponiveis = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleHorarioSelecionado = (horario) => {
    setHorarioSelecionado(horario);
    setBotaoAtivo(true);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDataChange = (data) => {
    setDataSeleciona(data);
    setHorarioSelecionado(null);
    setBotaoAtivo(false);
  };

  const handleAgendar = () => {
    console.log("Data selecionada:", dataSelecionada);
    console.log("Turno selecionado:", turnoSelecionado);
    console.log("Horário selecionado:", horarioSelecionado);

    setDataSeleciona(null);
    setTurnoSelecionado(null);
    setHorarioSelecionado(null);
    setBotaoAtivo(false);
    setAgendamentoRealizado(true);

    openModal();

    setTimeout(() => {
      setAgendamentoRealizado(false);
    }, 5000);
  };

  return (
    <>
      <Header isWhite />
      <div className="calendar">
        <div className="container_geral_calendario">
          <div className="agendamento">
            <section className="marcacao_data">
              <div className="titulo_inicial">
                <h1>Olá, vamos combinar um horário? </h1>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  Agende 30-40 minutos de conversa para resolver suas pendências
                  com o IRPF
                </p>
              </div>
              <div className="calendar-container">
                <h2 className="title">Escolha uma data:</h2>
                <DatePicker
                  selected={dataSelecionada}
                  onChange={handleDataChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  locale={ptBR}
                  filterDate={(date) =>
                    date.getDay() !== 6 && date.getDay() !== 0
                  }
                  inline
                  calendarClassName="custom-calendar"
                  wrapperClassName="datePicker"
                />
              </div>
              <div className="horario-container">
                <h2 className="title">Seu melhor horário:</h2>
                <div className="selecionar_horarios">
                  <section className="horarios">
                    {horariosDisponiveis.map((horario, index) => (
                      <button
                        key={horario}
                        className={`btn_horario ${
                          horario === horarioSelecionado ? "ativo" : "inativo"
                        }`}
                        onClick={() => handleHorarioSelecionado(horario)}
                      >
                        {horario}
                      </button>
                    ))}
                  </section>
                </div>
                <div className="btn_concluir">
                  <button
                    className={`btn_agendar ${
                      botaoAtivo ? "ativo" : "inativo"
                    }`}
                    onClick={handleAgendar}
                    disabled={!botaoAtivo}
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </section>

            <section className="info_container">
              <div className="dados_login">
                <div className="user">
                  <div className="icon-user">
                    <FaCircleUser size={80} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {usuarioLogado ? usuarioLogado.nome : "usuario"}
                  </div>
                </div>
                <div className="dados_atendimento">
                  <span>
                    <h1>Agendamento</h1>
                    <div className="agendamento_organization">
                      <div className="icon-clock">
                        <CiClock2 size={25} />
                      </div>
                      <p className="duracao">duração 30-40 mins</p>
                    </div>
                  </span>
                </div>
              </div>
              <div
                style={{ borderBottom: "solid 2px #DEDBDB", width: "500px" }}
              ></div>
              <div className="texto-principal">
                <p className="p1">
                  O Núcleo de Apoio Contábil e Fiscal (NAF) conta com o
                  atendimento de estudantes supervisionados por professores dos
                  cursos de Administração e de Ciências Contábeis, e que são
                  capacitados regularmente pela Receita Federal.{" "}
                </p>
                <p className="p2">
                  <VscCheckAll /> orientações para declaração de IRPF
                </p>
                <p className="p3">
                  <VscCheckAll /> serviços de atendimento de orientação às
                  Pessoas Físicas, MEI e instituições sem finalidades lucrativas
                </p>
                <p className="p4">
                  Você também pode tirar quaisquer duvidas pertinentes à Receita
                  Federal
                </p>
              </div>
            </section>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Mensagem de Agendamento"
            className="modal"
          >
            <div>
              <div className="modal_conteudo">
                <div className="mensagem_agendamento">
                  <h2 style={{ fontWeight: "bolder", fontSize: "18px" }}>
                    Agendamento realizado com sucesso!
                  </h2>
                  <p>
                    Um e-mail será enviado para sua caixa de mensagem com mais
                    detalhes do seu agendamento.
                  </p>
                </div>
                <div className="feedback">
                  <label htmlFor="feedback">
                    Deixe seu feedback: <br />
                  </label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="4"
                    cols="50"
                  ></textarea>
                  <button className="btn_fechar" onClick={closeModal}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Agendamento;
