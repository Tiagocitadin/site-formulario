import React, { useState } from 'react';
import './App.css';
import Home from './Home';

const perguntas = [
  {
    texto: "Qual área da sua vida está tirando mais a sua paz hoje?",
    opcoes: ["Meu Casamento / Relacionamento", "Maternidade e Filhos", "Ansiedade e Emoções", "Minha Vida espiritual"]
  },
  {
    texto: "Há quanto tempo você sente que precisa de ajuda profissional para lidar com isso?",
    opcoes: ["É algo recente (menos de 1 mês)", "Já faz alguns meses", "Há mais de 1 ano", "Sinto que estou no meu limite agora"]
  },
  {
    texto: "A 1ª sessão é um presente para nos conhecermos. Caso faça sentido continuar, você possui orçamento para investir no seu tratamento mensalmente?",
    opcoes: ["Sim, priorizo minha saúde emocional", "Tenho interesse, mas o orçamento é apertado", "Não, busco apenas atendimento gratuito/social"]
  },
  {
    texto: "o Atendimento é 100% Online por vídeo. Você possui um local reservado e internet estável para realizar as sessões?",
    opcoes: ["Sim, tenho total privacidade", "Consigo me organizar para ter privacidade", "Não tenho privacidade em casa"]
  },
  {
    texto: "Se você gostar da metodologia da Bea Paes na sessão experimental, o que te impediria de iniciar o tratamento?",
    opcoes: ["Nada, eu decido sozinho(a)", "Precisaria conversar com meu esposo(a)", "Apenas a questão financeira.", "Não pretendo continuar, quero apenas a grátis"]
  }
];

function App() {
  // 1. COMEÇA PELOS DADOS
  const [etapa, setEtapa] = useState('dados');
  const [atual, setAtual] = useState(0);
  const [dadosUsuario, setDadosUsuario] = useState({ nome: "", email: "", telefone: "" });
  const [respostas, setRespostas] = useState([]);
  const [selecionado, setSelecionado] = useState("");
  const [erros, setErros] = useState({ nome: false, telefone: false });
  const [enviando, setEnviando] = useState(false);

  const URL_GOOGLE = import.meta.env.VITE_GOOGLESHEETS_URL;
  const URL_INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL;

  const handleTelefone = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 0) v = "(" + v;
    if (v.length > 3) v = v.slice(0, 3) + ")" + v.slice(3);
    if (v.length > 9) v = v.slice(0, 9) + "-" + v.slice(9);
    setDadosUsuario({ ...dadosUsuario, telefone: v });
    setErros({ ...erros, telefone: false });
  };

  const iniciarQuiz = () => {
    // Validação: Nome não pode estar vazio e telefone precisa de 11 dígitos
    const nErro = !dadosUsuario.nome.trim();
    const tErro = dadosUsuario.telefone.replace(/\D/g, "").length < 11;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const eErro = dadosUsuario.email.trim() !== "" && !emailRegex.test(dadosUsuario.email);

    if (nErro || tErro || eErro) {
      setErros({
        nome: nErro,
        telefone: tErro,
        email: eErro
      });
      return; // Para aqui e mostra os erros
    }

    setErros({}); // Limpa erros se tudo estiver ok
    setEtapa('quiz');
  };

  const proximo = () => {
    if (!selecionado) {
      alert("Por favor, selecione uma opção para continuar.");
      return;
    }
    const novasRespostas = [...respostas, selecionado];
    setRespostas(novasRespostas);
    setSelecionado("");

    if (atual < perguntas.length - 1) {
      setAtual(atual + 1);
    } else {
      // 2. AO TERMINAR O QUIZ, VAI PARA A PÁGINA DE "ATENÇÃO" (FINAL)
      enviar(novasRespostas);
      setEtapa('final');
    }
  };

  const enviar = async (res) => {
    if (enviando) return;
    setEnviando(true);
    const params = new URLSearchParams();
    params.append("data", new Date().toLocaleString("pt-BR"));
    params.append("nome", dadosUsuario.nome);
    params.append("telefone", dadosUsuario.telefone);
    params.append("email", dadosUsuario.email);
    res.forEach((r, i) => params.append(`r${i + 1}`, r));

    try {
      await fetch(URL_GOOGLE, {
        method: "POST",
        mode: "no-cors",
        body: params
      });
    } catch (err) {
      console.error("Erro no envio:", err);
    } finally {
      setEnviando(false);
    }
  };

  // 3. O SITE SÓ APARECE SE A ETAPA FOR 'inicio'
  if (etapa === 'inicio') {
    return <Home />;
  }

  return (
    <div className="container">
      {/* HEADER DO QUIZ */}
      {etapa !== 'inicio' && (
        <div className="topo">
          {etapa === 'quiz' && (
            <span className="btn-voltar" onClick={() => (atual === 0 ? setEtapa('dados') : setAtual(atual - 1))}>
              ← Voltar
            </span>
          )}
          <span className="btn-fechar" onClick={() => window.location.href = URL_INSTAGRAM}>X</span>
        </div>
      )}

      {/* BARRA DE PROGRESSO */}
      {etapa === 'quiz' && (
        <div className="barra">
          {perguntas.map((_, i) => (
            <div key={i} className={i <= atual ? 'ativo' : ''}></div>
          ))}
        </div>
      )}

      {/* TELA 1: DADOS */}
      {etapa === 'dados' && (
        <div id="tela-dados">
          <img src="/foto.jpg" className="foto" alt="Bea Paes" />
          <h2>Para começar, me conte um pouco sobre você.</h2>

          {/* Campo Nome */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Nome"
              /* Aqui aplicamos a classe .erro se houver erro no nome */
              className={`input-estilizado ${erros.nome ? 'erro' : ''}`}
              value={dadosUsuario.nome}
              onChange={(e) => {
                setDadosUsuario({ ...dadosUsuario, nome: e.target.value });
                if (erros.nome) setErros({ ...erros, nome: false });
              }}
            />
            {erros.nome && <span className="erro-msg">⚠️ Campo obrigatório</span>}
          </div>

          {/* Campo Telefone */}
          <div className="input-group">
            <input
              type="tel"
              placeholder="(99)99999-9999"
              /* Aqui aplicamos a classe .erro se houver erro no telefone */
              className={`input-estilizado ${erros.telefone ? 'erro' : ''}`}
              value={dadosUsuario.telefone}
              onChange={(e) => {
                handleTelefone(e);
                if (erros.telefone) setErros({ ...erros, telefone: false });
              }}
            />
            {erros.telefone && <span className="erro-msg">⚠️ Telefone obrigatório (11 dígitos)</span>}
          </div>

          {/* Campo E-mail (Opcional) */}
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
      )}

      {/* TELA 2: PERGUNTAS */}
      {etapa === 'quiz' && (
        <div id="conteudo-quiz">
          <img src="/foto.jpg" className="foto" alt="Bea Paes" />
          <h2>{perguntas[atual].texto}</h2>
          <div id="opcoes">
            {perguntas[atual].opcoes.map((op, i) => (
              <div key={i} className={`option ${selecionado === op ? 'selected' : ''}`} onClick={() => setSelecionado(op)}>
                {op}
              </div>
            ))}
          </div>
          <button onClick={proximo}>{enviando ? "Processando..." : "Continuar"}</button>
        </div>
      )}

      {/* TELA 3: ATENÇÃO (VEM ANTES DO SITE) */}
      {etapa === 'final' && (
        <div className="final-content">
          <div className="icon">⚠️</div>
          <div className="titulo">
            Atenção: Sua sessão <br /> <strong className="nao">NÃO</strong> está agendada ainda.
          </div>
          <div className="texto">
            Para garantir sua sessão <strong className="cortesia">cortesia</strong>, escolha o melhor horário para você. Como as vagas são limitadas,
            recomendo agendar agora para assegurar seu atendimento.
          </div>

          <button className="botao" onClick={() => setEtapa('inicio')}>
            CONHECER BEA PAES E AGENDAR!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;