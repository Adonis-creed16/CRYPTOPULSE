import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/" className="logo">
          <span style={{color: 'var(--binance-yellow)'}}>🪙</span> BINANCE
        </a>
        <a href="#" className="nav-link desktop-only">Buy Crypto</a>
        <a href="#" className="nav-link desktop-only">Markets</a>
        <a href="#" className="nav-link desktop-only">Trade</a>
        <a href="#" className="nav-link desktop-only">Derivatives</a>
      </div>
      <div className="nav-right">
        <button className="btn-login">Log In</button>
        <button className="btn-register">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
