import React from 'react';
import './Home.css';

function Home() {
    const URL_INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL;
    const URL_AGENDA = import.meta.env.VITE_CALENDAR_URL;

    // Função para abrir o link
    const abrirAgenda = () => {
        if (URL_AGENDA) {
            window.open(URL_AGENDA, '_blank', 'noopener,noreferrer');
        } else {
            console.warn("URL da agenda não configurada no .env");
        }
    };

    return (
        <div className="home-container">
            <nav className="home-nav">
                <span className="logo">Bea Paes</span>
                <a href={URL_INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link">Instagram</a>
            </nav>

            <main className="home-content">
                <div className="home-text">
                    {/* SEÇÃO DE AGENDAMENTO NO TOPO PARA MÁXIMO DESTAQUE */}
                    <div className="home-actions-top">
                        <button className="btn-principal pulse-effect" onClick={abrirAgenda}>
                            <span className="btn-icon">✨</span>
                            Agendar Minha Sessão Experimental
                        </button>
                        <p className="subtext-top">Vagas limitadas para este mês</p>
                    </div>

                    <span className="tagline">Terapia Individual Online</span>
                    <h1>Recupere sua paz e o equilíbrio das suas emoções.</h1>
                    <p>
                        Um espaço seguro e acolhedor para você lidar com ansiedade,
                        relacionamentos e os desafios da maternidade.
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

            <footer className="home-footer">
                <div className="footer-grid">
                    {/* Bloco 1: Manifesto */}
                    <div className="footer-block manifesto">
                        <span className="footer-label">Propósito</span>
                        <p>Acolhimento clínico focado na saúde emocional e no resgate da paz interior.</p>
                    </div>

                    {/* Bloco 2: Identidade */}
                    <div className="footer-block brand">
                        <span className="logo">Bea Paes</span>
                        <p>Terapeuta Online</p>
                    </div>

                    {/* Bloco 3: Localização & Contato */}
                    <div className="footer-block contact">
                        <span className="footer-label">Disponibilidade</span>
                        <p>Atendimento Brasil</p>
                        <p className="contact-value">(48) 99922-2343</p>
                    </div>
                </div>

                <div className="footer-legal">
                    <div className="legal-left">© 2026 BEA PAES</div>
                    <div className="legal-right">ÉTICA E SIGILO PROFISSIONAL</div>
                </div>
            </footer>
        </div>
    );
}

export default Home;