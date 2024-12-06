import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import "./adm.css";
import Header from "../../components/header";
import Footer from "../../components/Footer";

function Adm() {
  const [agendamentos, setAgendamentos] = useState([]);

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
                agendamentosArray.push({
                  nome: agendamento.nome,
                  email: agendamento.email,
                  data: agendamento.data,
                  horario: agendamento.horario,
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

  return (
    <div className="container">
      <Header isWhite />
      <h1 className="title_agendamento">Lista de agendamentos</h1>
      <div className="agendamentos_adm">
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento, index) => (
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
