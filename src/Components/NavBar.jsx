import React from 'react';

function Navbar({ URL_INSTAGRAM }) {
    return (
        <nav className="home-nav">
            <span className="logo">Bea Paes</span>
            <a href={URL_INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link">
                <img src="/instagram.png"
                    alt="instagram"
                    style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                Instagram
            </a>
        </nav>
    );
}

export default Navbar;