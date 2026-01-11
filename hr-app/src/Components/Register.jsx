import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Wysyła dokładnie Twój format JSON
      });

      if (response.ok) {
        alert("Rejestracja udana!");
      } else {
        alert("Błąd rejestracji");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Rejestracja</h2>
        <input style={inputStyle} name="username" placeholder="Username" onChange={handleChange} required />
        <input style={inputStyle} name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input style={inputStyle} name="password" type="password" placeholder="Hasło" onChange={handleChange} required />
        <button type="submit" style={buttonStyle}>Zarejestruj się</button>
      </form>
    </div>
  );
};

// Style
const containerStyle = { display: 'flex', justifyContent: 'center', marginTop: '50px' };
const formStyle = { padding: '30px', border: '1px solid #ddd', borderRadius: '8px', width: '300px' };
const inputStyle = { width: '100%', marginBottom: '15px', padding: '10px', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' };

export default Register;