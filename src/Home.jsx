import React from 'react';
import './Home.css';

function Home({ aoIniciar }) {
    const URL_INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL;

    return (
        <div className="home-container">
            <nav className="home-nav">
                <span className="logo">Bea Paes</span>
                <a href={URL_INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link">Instagram</a>
            </nav>

            <main className="home-content">
                <div className="home-text">
                    <span className="tagline">Terapia Individual Online</span>
                    <h1>Recupere sua paz e o equilíbrio das suas emoções.</h1>
                    <p>
                        Um espaço seguro e acolhedor para você lidar com ansiedade,
                        relacionamentos e os desafios da maternidade.
                    </p>


                    <div className="home-video-wrapper">
                        <video
                            key="video-home-bea" /* Isso força o React a renderizar o vídeo do zero */
                            controls
                            playsInline
                            preload="auto" /* Carrega o vídeo assim que a página abre */
                            poster="/capa-video.jpg"
                            className="home-video"
                        >
                            <source src="/video.mp4" type="video/mp4" />
                            Seu navegador não suporta vídeos.
                        </video>

                        {/* Detalhe flutuante para dar profundidade */}
                        <div className="video-label">
                            <span>▶ Assistir Apresentação</span>
                        </div>
                    </div>

                    <div className="home-actions">
                        <button className="btn-principal" onClick={aoIniciar}>
                            Agendar Sessão Experimental
                        </button>
                        <p className="subtext">Leva menos de 2 minutos para iniciar.</p>
                    </div>
                </div>

                <div className="home-image">
                    <img src="/foto.jpg" alt="Terapeuta Bea Paes" />
                    <div className="exp-badge">
                        <strong>+500</strong>
                        <span>Vidas Transformadas</span>
                    </div>
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