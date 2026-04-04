import React, { useState } from 'react';
import './App.css';
import Home from './Home';

const perguntas = [
  {
    texto: "Qual área da sua vida está tirando mais a sua paz hoje?",
    opcoes: [
      "Meu Casamento / Relacionamento",
      "Maternidade e Filhos",
      "Ansiedade e Emoções",
      "Minha Vida espiritual"
    ]
  },
  {
    texto: "Há quanto tempo você sente que precisa de ajuda profissional para lidar com isso?",
    opcoes: [
      "É algo recente (menos de 1 mês)",
      "Já faz alguns meses", "Há mais de 1 ano",
      "Sinto que estou no meu limite agora"
    ]
  },
  {
    texto: "A 1ª sessão é um presente para nos conhecermos. Caso faça sentido continuar, você possui orçamento para investir no seu tratamento mensalmente?",
    opcoes: [
      "Sim, priorizo minha saúde emocional",
      "Tenho interesse, mas o orçamento é apertado",
      "Não, busco apenas atendimento gratuito/social"
    ]
  },
  {
    texto: "o Atendimento é 100% Online por vídeo. Você possui um local reservado e internet estável para realizar as sessões?",
    opcoes: [
      "Sim, tenho total privacidade",
      "Consigo me organizar para ter privacidade",
      "Não tenho privacidade em casa"
    ]
  },
  {
    texto: "Se você gostar da metodologia da Bea Paes na sessão experimental, o que te impediria de iniciar o tratamento?",
    opcoes: [
      "Nada, eu decido sozinho(a)",
      "Precisaria conversar com meu esposo(a)",
      "Apenas a questão financeira.",
      "Não pretendo continuar, quero apenas a grátis"
    ]
  }
];

function App() {
  // Alteramos a etapa inicial para 'inicio' (que é a Home)
  const [etapa, setEtapa] = useState('inicio'); 
  const [atual, setAtual] = useState(0);
  const [dadosUsuario, setDadosUsuario] = useState({ nome: "", email: "", telefone: "" });
  const [respostas, setRespostas] = useState([]);
  const [selecionado, setSelecionado] = useState("");
  const [erros, setErros] = useState({ nome: false, telefone: false });
  const [enviando, setEnviando] = useState(false);

  const URL_GOOGLE = import.meta.env.VITE_GOOGLE_URL;
  const URL_INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL;
  const URL_CALENDAR = import.meta.env.VITE_CALENDAR_URL;

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
    const nErro = !dadosUsuario.nome.trim();
    const tErro = dadosUsuario.telefone.replace(/\D/g, "").length < 11;
    if (nErro || tErro) {
      setErros({ nome: nErro, telefone: tErro });
      return;
    }
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
      enviar(novasRespostas);
    }
  };

  const voltar = () => {
    if (atual === 0) setEtapa('dados');
    else setAtual(atual - 1);
  };

  const enviar = async (res) => {
    if (enviando) return;
    setEnviando(true);
    setEtapa('final');

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

  // LÓGICA DE ROTEAMENTO
  if (etapa === 'inicio') {
    return <Home aoIniciar={() => setEtapa('dados')} />;
  }

  return (
    <div className="container">
      {etapa !== 'final' && (
        <>
          <div className="topo">
            {etapa !== 'dados' ? (
              <span className="btn-voltar" onClick={voltar} style={{ cursor: 'pointer' }}>
                ← Voltar
              </span>
            ) : (
              /* Se estiver na tela de dados, o voltar volta para a Home */
              <span className="btn-voltar" onClick={() => setEtapa('inicio')} style={{ cursor: 'pointer' }}>
                ← Início
              </span>
            )}

            <span className="btn-fechar" onClick={() => window.location.href = URL_INSTAGRAM} style={{ cursor: 'pointer' }}>
              X
            </span>
          </div>

          <div className="barra">
            {perguntas.map((_, i) => (
              <div key={i} className={i <= atual && etapa === 'quiz' ? 'ativo' : ''}></div>
            ))}
          </div>
        </>
      )}

      {etapa === 'dados' && (
        <div id="tela-dados">
          <img src="/foto.jpg" className="foto" alt="Bea Paes" />
          <h2>Para começar, me conte um pouco sobre você.</h2>
          <input
            type="text" placeholder="Nome" className="input-estilizado"
            value={dadosUsuario.nome}
            onChange={(e) => { setDadosUsuario({ ...dadosUsuario, nome: e.target.value }); setErros({ ...erros, nome: false }) }}
            style={{ borderColor: erros.nome ? '#d93025' : '#eee' }}
          />
          {erros.nome && <span className="erro-msg">⚠️ O nome é obrigatório.</span>}

          <input
            type="tel" placeholder="(99)99999-9999" className="input-estilizado"
            value={dadosUsuario.telefone} onChange={handleTelefone}
            style={{ borderColor: erros.telefone ? '#d93025' : '#eee' }}
          />
          {erros.telefone && <span className="erro-msg">⚠️ Digite o número completo com DDD.</span>}

          <input
            type="email" placeholder="E-mail (opcional)" className="input-estilizado"
            value={dadosUsuario.email} onChange={(e) => setDadosUsuario({ ...dadosUsuario, email: e.target.value })}
          />
          <button onClick={iniciarQuiz} style={{ marginTop: '30px' }}>Continuar</button>
        </div>
      )}

      {etapa === 'quiz' && (
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
          <button
            onClick={proximo}
            disabled={enviando}
            style={{ opacity: enviando ? 0.6 : 1 }}
          >
            {enviando ? "Enviando..." : "Continuar"}
          </button>
        </div>
      )}

      {etapa === 'final' && (
        <>
          <div className="topo">
            <div />
            <span 
              className="btn-fechar" 
              onClick={() => window.location.href = URL_INSTAGRAM} 
              style={{ cursor: 'pointer' }}
            >
              X
            </span>
          </div>

          <div className="final-content">
            <div className="icon">⚠️</div>
            <div className="titulo">
              Atenção: Sua sessão <br /> <strong className="nao">NÃO</strong> está agendada ainda.
            </div>
            <div className="texto">
              Para garantir sua sessão <strong className="cortesia">cortesia</strong>, escolha o melhor horário para você no calendário abaixo. Como as vagas são limitadas, 
              recomendo agendar agora para assegurar seu atendimento.
            </div>
            
            <button 
              className="botao" 
              onClick={() => window.open(URL_CALENDAR, '_blank')} 
            >
              AGENDAR MEU HORÁRIO!
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;