import React from 'react';

function Hero({ abrirAgenda }) {
    return (
        <main className="home-content">
            <div className="home-text">

                <div className="home-actions-top">
                    <button className="btn-principal pulse-effect" onClick={abrirAgenda}>
                        <span className="btn-icon">✨</span>
                        Agendar Minha Sessão Experimental
                    </button>
                    <p className="subtext-top">Vagas limitadas para este mês</p>
                </div>

                <span className="tagline">Terapia Individual Online</span>

                <h1>
                    Pare de viver no limite emocional.
                    Volte a se sentir em paz e no controle da sua vida.
                </h1>

                <p>
                    Você não precisa enfrentar ansiedade, conflitos e sobrecarga sozinha(o).
                    Aqui começa um processo real de mudança, com acolhimento e direção.
                </p>

                <div className="home-video-wrapper">
                    <video
                        key="video-home-bea"
                        controls
                        playsInline
                        preload="auto"
                        poster="/capa-video.jpg"
                        className="home-video"
                    >
                        <source src="/video.mp4" type="video/mp4" />
                        Seu navegador não suporta vídeos.
                    </video>

                    <div className="video-label">
                        <span>▶ Assistir Apresentação</span>
                    </div>
                </div>
            </div>

            <div className="home-image">
                <img src="/foto.jpg" alt="Terapeuta Bea Paes" />
            </div>
        </main>
    );
}

export default Hero;