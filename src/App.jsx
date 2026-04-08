import { useState } from 'react';
import './App.css';
import Home from './pages/Home';

import Dados from './components/Dados';
import Quiz from './components/Quiz';
import Final from './components/Final';

import { perguntas } from './Data/Pergunta';
import { enviarDados } from './Services/envioService';

function App() {
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
    const nErro = !dadosUsuario.nome.trim();
    const tErro = dadosUsuario.telefone.replace(/\D/g, "").length < 11;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const eErro = dadosUsuario.email.trim() !== "" && !emailRegex.test(dadosUsuario.email);

    if (nErro || tErro || eErro) {
      setErros({ nome: nErro, telefone: tErro, email: eErro });
      return;
    }

    setErros({});
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
      setEtapa('final');
    }
  };

  const enviar = async (res) => {
    if (enviando) return;

    setEnviando(true);

    await enviarDados(URL_GOOGLE, dadosUsuario, res);

    setEnviando(false);
  };

  if (etapa === 'inicio') {
    return <Home />;
  }

  return (
    <div className="container">

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

      {etapa === 'quiz' && (
        <div className="barra">
          {perguntas.map((_, i) => (
            <div key={i} className={i <= atual ? 'ativo' : ''}></div>
          ))}
        </div>
      )}

      {etapa === 'dados' && (
        <Dados
          dadosUsuario={dadosUsuario}
          setDadosUsuario={setDadosUsuario}
          erros={erros}
          setErros={setErros}
          iniciarQuiz={iniciarQuiz}
          handleTelefone={handleTelefone}
        />
      )}

      {etapa === 'quiz' && (
        <Quiz
          perguntas={perguntas}
          atual={atual}
          selecionado={selecionado}
          setSelecionado={setSelecionado}
          proximo={proximo}
          enviando={enviando}
        />
      )}

      {etapa === 'final' && (
        <Final setEtapa={setEtapa} />
      )}

    </div>
  );
}

export default App;