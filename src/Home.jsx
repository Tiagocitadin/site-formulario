import React from 'react';
import './Home.css';
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
                <a href={URL_INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link">
                    <img src="/instagram.png"
                        alt="instagram"
                        style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Instagram
                </a>
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
                    <h1>Pare de viver no limite emocional.
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

            <footer className="home-footer">
                <div className="footer-grid">
                    {/* Bloco 1: Manifesto */}
                    <div className="footer-block manifesto">
                        <span className="footer-label">Propósito</span>
                        <p>Guiar você no caminho de volta à sua paz interior e ao equilíbrio emocional.</p>
                    </div>

                    {/* Bloco 2: Identidade */}


                    {/* Bloco 3: Localização & Contato */}
                    <div className="footer-block contact">
                        <span className="footer-label">Começar minha Jornada</span>

                        <p className="contact-item">
                            <MdEmail className="icon" />
                            beapaesterapeuta@gmail.com
                        </p>

                        <p className="contact-item">
                            <FaWhatsapp className="icon" />
                            <a
                                href="https://wa.me/5548999975141?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20o%20atendimento."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                (48) 99997-5141
                            </a>
                        </p>
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