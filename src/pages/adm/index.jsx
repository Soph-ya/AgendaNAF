import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { isToday, isThisWeek, isThisMonth, parse } from "date-fns";
import "./adm.css";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Adm() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarBotoesFiltro, setMostrarBotoesFiltro] = useState(false);

  function fetchAppointments() {
    const dbRef = ref(getDatabase());
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const agendamentosArray = [];

          Object.keys(data).forEach((userId) => {
            Object.keys(data[userId]).forEach((agendamentoKey) => {
              const agendamento = data[userId][agendamentoKey];
              if (agendamento.nome && agendamento.email && agendamento.data && agendamento.horario) {
                const dataFormatada = parse(agendamento.data, "dd/MM/yyyy", new Date());
                agendamentosArray.push({
                  nome: agendamento.nome,
                  email: agendamento.email,
                  data: agendamento.data,
                  horario: agendamento.horario,
                  dataObj: dataFormatada, 
                });
              }
            });
          });

          setAgendamentos(agendamentosArray);
        } else {
          console.log("Nenhum agendamento disponível");
          setAgendamentos([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar agendamentos:", error);
      });
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    switch (filtro) {
      case "dia":
        return isToday(agendamento.dataObj);
      case "semana":
        return isThisWeek(agendamento.dataObj); 
      case "mes":
        if (anoSelecionado && mesSelecionado) {
          return (
            agendamento.dataObj.getFullYear() === parseInt(anoSelecionado) &&
            agendamento.dataObj.getMonth() === parseInt(mesSelecionado) - 1 
          );
        }
        return isThisMonth(agendamento.dataObj);
      default:
        return true;
    }
  });

  const formatMes = (mes) => {
    return mes < 10 ? `0${mes}` : `${mes}`;
  };

  const gerarAnos = () => {
    const anoAtual = new Date().getFullYear();
    const anos = [];
    for (let i = anoAtual; i <= anoAtual + 2; i++) {
      anos.push(i);
    }
    return anos;
  };

  return (
    <div className="container">
      <Header isWhite />
      <h1 className="title_agendamento">Lista de agendamentos</h1>

      <div className="filtros">
        <button
          className="btn_seta"
          onClick={() => {
            setMostrarFiltros(!mostrarFiltros);
            setMostrarBotoesFiltro(!mostrarBotoesFiltro);
          }}
        >
          {mostrarFiltros ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>

        {!mostrarBotoesFiltro && <span className="texto-filtros">Filtros</span>}

        {mostrarBotoesFiltro && (
          <>
            <button className="btn_todos" onClick={() => setFiltro("todos")}>Todos</button>
            <button className="btn_todos" onClick={() => setFiltro("dia")}>Hoje</button>
            <button className="btn_todos" onClick={() => setFiltro("semana")}>Semana</button>
            <button className="btn_todos" onClick={() => setFiltro("mes")}>Mês</button>
          </>
        )}

        {mostrarFiltros && filtro === "mes" && (
          <div className="filtro-mes-ano">
            <select onChange={(e) => setMesSelecionado(e.target.value)} value={mesSelecionado}>
              <option value="">Selecione um mês</option>
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {`Mês ${index + 1}`}
                </option>
              ))}
            </select>

            <select onChange={(e) => setAnoSelecionado(e.target.value)} value={anoSelecionado}>
              {gerarAnos().map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="agendamentos_adm">
        {agendamentosFiltrados.length > 0 ? (
          agendamentosFiltrados.map((agendamento, index) => (
            <ul key={index} className="lista_agendamento">
              <li>Nome: {agendamento.nome}</li>
              <li>Contato: {agendamento.email}</li>
              <li>Data: {agendamento.data}</li>
              <li>Hora: {agendamento.horario}</li>
            </ul>
          ))
        ) : (
          <p>Não há agendamentos disponíveis no momento.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Adm;
