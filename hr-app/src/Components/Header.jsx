import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HR-Portal</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Oferty Pracy</Link>
            </li>
            
            {/* Sekcja DLA PRACODAWCY */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="employerDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Dla Pracodawcy
              </a>
              <ul className="dropdown-menu" aria-labelledby="employerDropdown">
                <li><Link className="dropdown-item" to="/register">Zarejestruj się</Link></li>
                <li><Link className="dropdown-item" to="/login">Zaloguj się</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/add-job">Dodaj ofertę</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}