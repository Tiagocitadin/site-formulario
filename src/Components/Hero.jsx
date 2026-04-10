import React from 'react';

function Hero({ abrirAgenda }) {
    return (
        <main className="home-content">
            <div className="home-text">

                {/* 1. VÍDEO */}
                <div className="home-video-wrapper">
                    <div className="video-responsive">
                        <iframe
                            src={`https://www.youtube.com/embed/${import.meta.env.VITE_YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                            title="Apresentação Bea Paes"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="home-video-iframe"
                        ></iframe>
                    </div>

                </div>

                {/* 2. BOTÃO */}
                <div className="home-actions-top">
                    <button className="btn-principal pulse-effect" onClick={abrirAgenda}>
                        <span className="btn-icon">✨</span>
                        Agendar Minha Sessão Experimental
                    </button>
                    <p className="subtext-top">Vagas limitadas para este mês</p>
                </div>

                {/* 3. TEXTOS */}
                <span className="tagline">Terapia Individual Online</span>

                <h1>
                    Pare de viver no limite emocional.
                    Volte a se sentir em paz e no controle da sua vida.
                </h1>

                <p className="description-p">
                    Você não precisa enfrentar ansiedade, conflitos e sobrecarga sozinha(o).
                    Aqui começa um processo real de mudança, com acolhimento e direção.
                </p>               
            </div>

            <div className="home-image">
                {/* Nova Div para o texto acima da foto */}
                <div className="image-intro-area">
                    <p className="intro-phrase">
                        {/* Escolha a frase aqui: */}
                        Você não precisa carregar tudo sozinha(o). Vamos reencontrar a sua tranquilidade?
                    </p>

                    {/* O texto que você já colocou */}
                    <div className="image-intro">
                        <span>Prazer, eu sou a Bea Paes</span>
                        <p>Terapeuta Emocional</p>
                    </div>
                </div>

                <img src="/foto.jpg" alt="Terapeuta Bea Paes" />
            </div>
        </main>
    );
}

export default Hero;