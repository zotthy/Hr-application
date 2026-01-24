import React from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HR-Portal</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* 1. Oferty pracy widoczne TYLKO dla niezalogowanych */}
            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Oferty Pracy</Link>
              </li>
            )}

            {/* 2. Opcje widoczne TYLKO dla zalogowanych */}
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Mój Profil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/recruitments">Zarządzaj Ofertami</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {token ? (
              <li className="nav-item">
                <button 
                  onClick={handleLogout} 
                  className="nav-link btn btn-link" 
                  style={{ textDecoration: 'none', color: '#dc3545' }}
                >
                  Wyloguj się
                </button>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <span 
                  className="nav-link dropdown-toggle" 
                  id="employerDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  style={{ cursor: 'pointer' }}
                >
                  Dla Pracodawcy
                </span>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="employerDropdown">
                  <li><Link className="dropdown-item" to="/register">Zarejestruj się</Link></li>
                  <li><Link className="dropdown-item" to="/login">Zaloguj się</Link></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}