export default function Final({ setEtapa }) {
  return (
    <div className="final-content">
      <div className="icon">⚠️</div>

      <div className="titulo">
        Atenção: Sua sessão <br />
        <strong className="nao">NÃO</strong> está agendada ainda.
      </div>

      <div className="texto">
        Para garantir sua sessão <strong className="cortesia">cortesia</strong>, escolha o melhor horário para você. Como as vagas são limitadas,
        recomendo agendar agora para assegurar seu atendimento.
      </div>

      <button className="botao" onClick={() => setEtapa('inicio')}>
        CONHECER BEA PAES E AGENDAR!
      </button>
    </div>
  );
}