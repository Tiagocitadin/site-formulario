import React from 'react';

import Navbar from '../Components/NavBar';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';

import '../components/NavBar.css';
import '../components/Hero.css';
import '../components/Footer.css';


import '../styles/Variables.css';
import '../styles/Global.css';



function Home() {

    const URL_INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL;
    const URL_AGENDA = import.meta.env.VITE_CALENDAR_URL;

    const abrirAgenda = () => {
        if (URL_AGENDA) {
            window.open(URL_AGENDA, '_blank', 'noopener,noreferrer');
        } else {
            console.warn("URL da agenda não configurada no .env");
        }
    };

    return (
        <div className="home-container">
            <Navbar URL_INSTAGRAM={URL_INSTAGRAM} />
            <Hero abrirAgenda={abrirAgenda} />
            <Footer />
        </div>
    );
}

export default Home;