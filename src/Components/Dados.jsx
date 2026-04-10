export default function Dados({
  dadosUsuario,
  setDadosUsuario,
  erros,
  setErros,
  iniciarQuiz,
  handleTelefone
}) {
  return (
    <div id="tela-dados">
      <img src="/foto.jpg" className="foto" alt="Bea Paes" />
      <h2>Para começar, me conte um pouco sobre você.</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Nome"
          className={`input-estilizado ${erros.nome ? 'erro' : ''}`}
          value={dadosUsuario.nome}
          onChange={(e) => {
            setDadosUsuario({ ...dadosUsuario, nome: e.target.value });
            if (erros.nome) setErros({ ...erros, nome: false });
          }}
        />
        {erros.nome && <span className="erro-msg">⚠️ Campo obrigatório</span>}
      </div>

      <div className="input-group">
        <input
          type="tel"
          placeholder="(99)99999-9999"
          className={`input-estilizado ${erros.telefone ? 'erro' : ''}`}
          value={dadosUsuario.telefone}
          onChange={(e) => {
            handleTelefone(e);
            if (erros.telefone) setErros({ ...erros, telefone: false });
          }}
        />
        {erros.telefone && <span className="erro-msg">⚠️ Telefone obrigatório (11 dígitos)</span>}
      </div>

      <input
        type="email"
        placeholder="E-mail (opcional)"
        className={`input-estilizado ${erros.email ? 'erro' : ''}`}
        value={dadosUsuario.email}
        onChange={(e) => {
          setDadosUsuario({ ...dadosUsuario, email: e.target.value });
          if (erros.email) setErros({ ...erros, email: false });
        }}
      />
      {erros.email && <span className="erro-msg">⚠️ Formato de e-mail inválido</span>}

      <button onClick={iniciarQuiz}>Iniciar</button>
    </div>
  );
}