import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch('http://localhost:8080/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Rejestracja udana! Teraz możesz się zalogować.");
        navigate('/login');
      } else {
        setError("Błąd rejestracji. Użytkownik może już istnieć.");
      }
    } catch (error) {
      setError("Brak połączenia z serwerem.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Załóż konto</h2>
        <p style={subtitleStyle}>Dołącz do tysięcy kandydatów i rozwijaj swoją karierę</p>

        {error && <div style={errorBoxStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nazwa użytkownika</label>
            <input 
              style={inputStyle} 
              name="username" 
              placeholder="np. jan_kowalski" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Adres e-mail</label>
            <input 
              style={inputStyle} 
              name="email" 
              type="email" 
              placeholder="np. jan.kowalski@gmail.com" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Hasło</label>
            <input 
              style={inputStyle} 
              name="password" 
              type="password" 
              placeholder="Minimum 6 znaków" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" style={buttonStyle}>Zarejestruj się</button>
        </form>

        <div style={footerStyle}>
          Masz już konto? <span style={linkStyle} onClick={() => navigate('/login')}>Zaloguj się</span>
        </div>
      </div>
    </div>
  );
};

// --- STYLE (Spójne z Login.jsx i Pracuj.pl) ---
const containerStyle = { 
  backgroundColor: '#f4f7f9', 
  minHeight: '90vh', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const cardStyle = { 
  backgroundColor: '#fff', 
  padding: '40px', 
  borderRadius: '12px', 
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
  width: '100%', 
  maxWidth: '450px' 
};

const titleStyle = { 
  margin: '0 0 10px 0', 
  color: '#00285e', 
  textAlign: 'center', 
  fontSize: '26px',
  fontWeight: 'bold'
};

const subtitleStyle = { 
  margin: '0 0 30px 0', 
  color: '#718096', 
  textAlign: 'center', 
  fontSize: '14px',
  lineHeight: '1.5'
};

const inputGroupStyle = { 
  marginBottom: '20px' 
};

const labelStyle = { 
  display: 'block', 
  marginBottom: '8px', 
  fontSize: '14px', 
  fontWeight: '600', 
  color: '#4a5568' 
};

const inputStyle = { 
  width: '100%', 
  padding: '12px', 
  borderRadius: '8px', 
  border: '1px solid #e2e8f0', 
  boxSizing: 'border-box', 
  outline: 'none',
  fontSize: '15px'
};

const buttonStyle = { 
  width: '100%', 
  backgroundColor: '#ff5a00', // Pomarańczowy przycisk akcji (jak w Pracuj.pl)
  color: 'white', 
  padding: '14px', 
  border: 'none', 
  borderRadius: '8px', 
  fontWeight: 'bold', 
  cursor: 'pointer', 
  fontSize: '16px',
  transition: 'background 0.2s',
  marginTop: '10px'
};

const errorBoxStyle = { 
  backgroundColor: '#fff5f5', 
  color: '#c53030', 
  padding: '12px', 
  borderRadius: '8px', 
  marginBottom: '20px', 
  fontSize: '14px', 
  textAlign: 'center', 
  border: '1px solid #feb2b2' 
};

const footerStyle = { 
  marginTop: '25px', 
  textAlign: 'center', 
  fontSize: '14px', 
  color: '#718096' 
};

const linkStyle = { 
  color: '#004a99', 
  fontWeight: 'bold', 
  cursor: 'pointer' 
};

export default Register;