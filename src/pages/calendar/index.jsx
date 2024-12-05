import { useState, useEffect } from "react";
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
import { format } from "date-fns";
import { getDatabase, ref, remove, set, get } from "firebase/database";
import { getAuth } from "firebase/auth";


const Agendamento = () => {
  const [dataSelecionada, setDataSeleciona] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [botaoAtivo, setBotaoAtivo] = useState(false);
  const [agendamentoRealizado, setAgendamentoRealizado] = useState(false);
  
  const auth = getAuth();
  const usuarioLogado = auth.currentUser;
  
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

  const handleDataChange = (data) => {
    setDataSeleciona(data);
    setHorarioSelecionado(null);
    setBotaoAtivo(false);
  };

  const salvarAgendamento = (data, horario) => {
    if (usuarioLogado) {
      const database = getDatabase();
      const userId = usuarioLogado.uid;
      const dataFormatada = format(data, "dd/MM/yyyy");

      const agendamentoRef = ref(database, `agendamentos/${userId}`);
      set(agendamentoRef, {
        data: dataFormatada,
        horario: horario,
        nome: usuarioLogado.displayName,
        email: usuarioLogado.email,
        
      })
      .then(() => {
        console.log("Agendamento salvo com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao salvar agendamento: ", error);
      });
    } else {
      console.error("Usuário não logado.");
    }
  };
  
  console.log("Usuario logado:", usuarioLogado);
  console.log("Nome do usuario:", usuarioLogado ? usuarioLogado.displayName : "Não disponível");
  const cancelarAgendamento = () => {
    if (usuarioLogado) {
      const database = getDatabase();
      const userId = usuarioLogado.uid;
      const agendamentoRef = ref(database, `agendamentos/${userId}`);

      remove(agendamentoRef)
        .then(() => {
          console.log("Agendamento cancelado com sucesso!");
          setDataSeleciona(null);
          setHorarioSelecionado(null);
          setBotaoAtivo(false);
          setAgendamentoRealizado(false);
          alert("Agendamento cancelado.");
        })
        .catch((error) => {
          console.error("Erro ao cancelar agendamento: ", error);
          alert("Erro ao cancelar agendamento. Tente novamente.");
        });
    } else {
      console.error("Usuário não logado.");
    }
  };

  const remarcarAgendamento = () => {
    setDataSeleciona(null);
    setHorarioSelecionado(null);
    setBotaoAtivo(false);
    setAgendamentoRealizado(false);
  };

  const exibirDetalhesAgendamento = () => {
    const nomeUsuario = usuarioLogado ? usuarioLogado.displayName : "Usuário não identificado";
    const dataFormatada = dataSelecionada ? format(dataSelecionada, "dd/MM/yyyy") : "Data não selecionada";
    console.log("NOME" + nomeUsuario)
    return (
      <div className="dados-agendamento">
        <h2 className="title">Detalhes do Agendamento</h2>
        <p>Nome: {nomeUsuario}</p>
        <p>Data: {dataFormatada}</p>
        <p>Horário: {horarioSelecionado}</p>
        <div className="acoes_agendamento">
          <button className="btn_remarcar" onClick={remarcarAgendamento}>
            Remarcar
          </button>
          <button className="btn_cancelar" onClick={cancelarAgendamento}>
            Cancelar
          </button>
        </div>
      </div>
    );
  };

  const handleAgendar = () => {
    console.log("Data selecionada:", dataSelecionada);
    console.log("Horário selecionado:", horarioSelecionado);

    salvarAgendamento(dataSelecionada, horarioSelecionado);
    setAgendamentoRealizado(true);
  };


  return (
    <>
      <Header isWhite />
      <div className="calendar">
        <div className="container_geral_calendario">
          <div className="agendamento">
            <section className="marcacao_data">

              <div className="titulo_inicial">
                <h1>
                  {agendamentoRealizado
                    ? "Seu agendamento está confirmado!" // Novo título quando o agendamento for realizado
                    : "Olá, vamos combinar um horário?"}
                </h1>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  {agendamentoRealizado
                    ? "É só comparecer ao polo de sua cidade na data e horário combinado." // Novo texto explicativo
                    : "Agende 30-40 minutos de conversa para resolver suas pendências com o IRPF"}
                </p>
              </div>

              <div className="calendar-container" style={{ display: agendamentoRealizado ? 'none' : 'block' }}>
                <h2 className="title">Escolha uma data:</h2>
                <DatePicker
                  selected={dataSelecionada}
                  onChange={handleDataChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  locale={ptBR}
                  filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
                  inline
                  calendarClassName="custom-calendar"
                  wrapperClassName="datePicker"
                />
              </div>

              <div className="horario-container">
                {!agendamentoRealizado ? (
                  <>
                    <h2 className="title">Seu melhor horário:</h2>
                    <div className="selecionar_horarios">
                      <section className="horarios">
                        {horariosDisponiveis.map((horario) => (
                          <button
                            key={horario}
                            className={`btn_horario ${horario === horarioSelecionado ? "ativo" : "inativo"}`}
                            onClick={() => handleHorarioSelecionado(horario)}
                          >
                            {horario}
                          </button>
                        ))}
                      </section>
                    </div>
                    <div className="btn_concluir">
                      <button
                        className={`btn_agendar ${botaoAtivo ? "ativo" : "inativo"}`}
                        onClick={handleAgendar}
                        disabled={!botaoAtivo}
                      >
                        Agendar
                      </button>
                    </div>
                  </>
                ) : (
                  exibirDetalhesAgendamento()
                )}
              </div>
            </section>

            <section className="info_container">
              <div className="dados_login">
                <div className="user">
                  <div className="icon-user">
                    <FaCircleUser size={80} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {usuarioLogado ? usuarioLogado.displayName : "Usuário não identificado"}
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
              <div style={{ borderBottom: "solid 2px #DEDBDB", width: "500px" }}></div>
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
        </div>
      </div>
      <Footer />
    </>
  );

};

export default Agendamento;


{/* <Modal
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
          </Modal> */}