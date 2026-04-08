import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
    return (
        <footer className="home-footer">
            <div className="footer-grid">

                <div className="footer-block manifesto">
                    <span className="footer-label">Propósito</span>
                    <p>Guiar você no caminho de volta à sua paz interior e ao equilíbrio emocional.</p>
                </div>

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
    );
}

export default Footer;