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
          setAgendamentos(
            Object.keys(data).map((id) => ({ id, ...data[id] }))
          );
        } else {
          console.log("Nenhum agendamento disponível");
          setAgendamentos([]);
        }
      })
      .catch((error) => {
        console.error(error);
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
        {agendamentos.map((agendamento) => (
          <ul key={agendamento.id} className="lista_agendamento">
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
