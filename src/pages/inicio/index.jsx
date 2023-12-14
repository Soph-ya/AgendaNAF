import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./inicio.css";
import account from "../../img/account.jpg";

const Inicio = () => {
  return (
    <>
      <Header />
      <div className="home">
        <main>
          <div className="title-section">
            <img
              src={account}
              alt="Descrição da imagem"
              className="title-image"
            />
            <h1 className="titulo_inicio">
              Facilitando Sua Declaração de Imposto de Renda
            </h1>
          </div>

          <section className="sessao_paragrafo">
            <h2 className="titulo_paragrafo">Quem Está por Trás do NAF:</h2>
            <p>
              O NAF conta com a dedicação de estudantes supervisionados por
              professores dos cursos de Administração e Ciências Contábeis que
              são habilmente treinados pela Receita Federal, garantindo um
              suporte especializado. Além de auxiliar na declaração do IRPF,
              oferecemos orientações para Pessoas Físicas, Microempreendedores
              Individuais (MEI) e instituições sem fins lucrativos.
            </p>
          </section>

          <section className="sessao_paragrafo">
            <h2 className="titulo_paragrafo">Onde Estamos Localizados:</h2>
            <p>
              Você nos encontra no campus Antonio Paulo Capanema de Souza, na
              Av. Oliveira Botelho, 111, Alto. Estamos prontos para recebê-lo e
              oferecer a assistência necessária.
            </p>
          </section>

          <section className="sessao_paragrafo">
            <h2 className="titulo_paragrafo">Além do NAF: Empresa Júnior</h2>
            <p>
              Alunos e professores dos cursos de Administração e Ciências
              Contábeis não param por aí. Atuamos também por meio da Empresa
              Júnior, focada na capacitação e treinamento dos estudantes em
              diversas ações de extensão. Além da declaração do IRPF (valores
              sob consulta), oferecemos serviços de pesquisa de mercado e
              consultorias administrativa e contábil.
            </p>
          </section>

          <section className="sessao_paragrafo">
            <h2 className="titulo_paragrafo">Como Entrar em Contato com a Empresa Júnior:</h2>
            <p>
              Para mais informações e agendamentos, envie um e-mail para
              facilconsultoriajr@hotmail.com. Estamos aqui para simplificar e
              tornar mais eficiente a sua jornada contábil.
            </p>
            <p>
              Na Unifeso, estamos comprometidos em fazer a diferença na sua vida
              financeira. Contamos com a sua confiança!
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Inicio;
