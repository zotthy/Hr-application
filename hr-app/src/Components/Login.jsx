import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.message);
        localStorage.setItem('userEmail', email);
        navigate('/profile');
      } else {
        setError('Nieprawidłowe dane logowania');
      }
    } catch (err) {
      setError('Błąd połączenia z serwerem');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Zaloguj się</h2>
        <p style={subtitleStyle}>Użyj swojego konta, aby zarządzać aplikacjami</p>
        
        {error && <div style={errorBoxStyle}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>E-mail</label>
            <input 
              type="email" 
              style={inputStyle} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="np. jan.kowalski@gmail.com"
              required 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Hasło</label>
            <input 
              type="password" 
              style={inputStyle} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Twoje hasło"
              required 
            />
          </div>

          <button type="submit" style={loginBtnStyle}>Zaloguj się</button>
        </form>

        <div style={footerStyle}>
          Nie masz konta? <span style={linkStyle} onClick={() => navigate('/register')}>Zarejestruj się</span>
        </div>
      </div>
    </div>
  );
};

const containerStyle = { backgroundColor: '#f4f7f9', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' };
const cardStyle = { backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' };
const titleStyle = { margin: '0 0 10px 0', color: '#00285e', textAlign: 'center', fontSize: '24px' };
const subtitleStyle = { margin: '0 0 30px 0', color: '#718096', textAlign: 'center', fontSize: '14px' };
const inputGroupStyle = { marginBottom: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#4a5568' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box', outline: 'none' };
const loginBtnStyle = { width: '100%', backgroundColor: '#004a99', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' };
const errorBoxStyle = { backgroundColor: '#fff5f5', color: '#c53030', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #feb2b2' };
const footerStyle = { marginTop: '25px', textAlign: 'center', fontSize: '14px', color: '#718096' };
const linkStyle = { color: '#004a99', fontWeight: 'bold', cursor: 'pointer' };

export default Login;