import { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import "./adm.css";
import Header from "../../components/header";
import Footer from "../../components/Footer";

function Adm() {
  const [agendamentos, setAgendamentos] = useState([]);

  function fetchAppointments() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `agendamentos/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const agendamentosArray = [];
          Object.keys(data).forEach((ano) => {
            Object.keys(data[ano]).forEach((mes) => {
              Object.keys(data[ano][mes]).forEach((dia) => {
                const horarios = data[ano][mes][dia];
                Object.keys(horarios).forEach((horario) => {
                  const agendamento = horarios[horario];
                  agendamentosArray.push({
                    data: `${dia}/${mes}/${ano}`,
                    horario,
                    nome: agendamento.nome,
                    email: agendamento.email,
                  });
                });
              });
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

  return (
    <>
      <div className="container">
        <Header isWhite />
        <h1 className="title_agendamento">Lista de agendamentos</h1>
        <div className="agendamentos_adm">
          {agendamentos.map((agendamento, index) => (
            <ul key={index} className="lista_agendamento">
              <li>Nome: {agendamento.nome}</li>
              <li>Contato: {agendamento.email}</li>
              <li>Data: {agendamento.data}</li>
              <li>Hora: {agendamento.horario}</li>
              <br />
            </ul>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Adm;
