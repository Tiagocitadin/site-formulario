export default function Quiz({
  perguntas,
  atual,
  selecionado,
  setSelecionado,
  proximo,
  enviando
}) {
  return (
    <div id="conteudo-quiz">
      <img src="/foto.jpg" className="foto" alt="Bea Paes" />
      <h2>{perguntas[atual].texto}</h2>

      <div id="opcoes">
        {perguntas[atual].opcoes.map((op, i) => (
          <div
            key={i}
            className={`option ${selecionado === op ? 'selected' : ''}`}
            onClick={() => setSelecionado(op)}
          >
            {op}
          </div>
        ))}
      </div>

      <button onClick={proximo}>
        {enviando ? "Processando..." : "Continuar"}
      </button>
    </div>
  );
}