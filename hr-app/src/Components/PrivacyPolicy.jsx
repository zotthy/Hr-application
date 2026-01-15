import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div style={pageContainerStyle}>
      <div style={contentCardStyle}>
        <button onClick={() => navigate(-1)} style={backButtonStyle}>← Powrót</button>
        
        <h1 style={titleStyle}>Polityka Prywatności</h1>
        <p style={dateStyle}>Ostatnia aktualizacja: 15 stycznia 2026</p>

        <section style={sectionStyle}>
          <h2 style={subTitleStyle}>1. Informacje ogólne</h2>
          <p style={textStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subTitleStyle}>2. Dane osobowe (RODO)</h2>
          <p style={textStyle}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <ul style={listStyle}>
            <li>Dane zbierane podczas rejestracji: email, nazwa użytkownika.</li>
            <li>Dane zbierane w formularzu: imię, nazwisko, doświadczenie.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

// --- STYLE (Muszą być w tym samym pliku!) ---
const pageContainerStyle = { backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '60px 20px', display: 'flex', justifyContent: 'center', fontFamily: "'Inter', sans-serif" };
const contentCardStyle = { backgroundColor: '#fff', maxWidth: '800px', width: '100%', padding: '50px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' };
const backButtonStyle = { background: 'none', border: 'none', color: '#004a99', fontWeight: '600', cursor: 'pointer', marginBottom: '30px' };
const titleStyle = { color: '#00285e', fontSize: '32px', fontWeight: '800', marginBottom: '10px' };
const dateStyle = { color: '#a0aec0', fontSize: '14px', marginBottom: '40px' };
const sectionStyle = { marginBottom: '35px' };
const subTitleStyle = { color: '#00285e', fontSize: '20px', fontWeight: '700', marginBottom: '15px', borderLeft: '4px solid #ff5a00', paddingLeft: '15px' };
const textStyle = { color: '#4a5568', lineHeight: '1.8', fontSize: '16px' };
const listStyle = { color: '#4a5568', lineHeight: '2', marginTop: '15px' };

export default PrivacyPolicy; // Kluczowe dla błędu "export not found"