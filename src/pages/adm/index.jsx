import { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";

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
      <h1>Agendamentos</h1>
      <div>
        {agendamentos.map((agendamento) => (
          <ul key={agendamento.id}>
            <li>Nome: {agendamento.nome}</li>
            <li>Contato: {agendamento.email}</li>
            <li>Data: {agendamento.data}</li>
            <li>Hora: {agendamento.horario}</li>
            <br />
          </ul>
        ))}
      </div>
    </>
  );
}

export default Adm;
