import React, { useState } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobId: "JOB123",
    status: "active",
    // Parametry liczbowe (zakres np. 0-10)
    experienceYears: 1,
    education: 0,
    certifications: 1,
    jobRole: 0,
    salaryExpectation: 1,
    projectsCount: 0,
    // Umiejętności techniczne (suwaki 0 lub 1)
    cpp: 1,
    cybersecurity: 0,
    deepLearning: 1,
    ethicalHacking: 0,
    java: 1,
    linux: 1,
    machineLearning: 1,
    nlp: 0,
    networking: 1,
    python: 1,
    pytorch: 0,
    react: 1,
    sql: 1,
    tensorFlow: 0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Konwertujemy na liczbę, jeśli to range lub number
    setFormData(prev => ({
      ...prev,
      [name]: type === 'range' || type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gotowy obiekt JSON:", formData);
    alert("Dane wysłane do konsoli (F12)");
  };

  // Listy pól dla automatyzacji wyświetlania
  const mainStats = [
    "experienceYears", "education", "certifications", 
    "jobRole", "salaryExpectation", "projectsCount"
  ];

  const techSkills = [
    "cpp", "cybersecurity", "deepLearning", "ethicalHacking", "java", 
    "linux", "machineLearning", "nlp", "networking", "python", 
    "pytorch", "react", "sql", "tensorFlow"
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Formularz Rekrutacyjny</h2>

        {/* SEKCOJA 1: DANE OSOBOWE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <div>
            <label>Imię</label>
            <input style={inputStyle} name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label>Nazwisko</label>
            <input style={inputStyle} name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label>Email</label>
            <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        {/* SEKCOJA 2: STATYSTYKI GŁÓWNE */}
        <h3>Parametry Ogólne</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {mainStats.map(stat => (
            <div key={stat} style={cardStyle}>
              <label style={{ fontSize: '14px', fontWeight: 'bold' }}>{stat}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="range" name={stat} min="0" max="10" step="1" value={formData[stat]} onChange={handleChange} style={{ flex: 1 }} />
                <span style={{ minWidth: '20px', fontWeight: 'bold' }}>{formData[stat]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* SEKCOJA 3: UMIEJĘTNOŚCI TECHNICZNE (0-1) */}
        <h3>Umiejętności Techniczne (0 = Brak, 1 = Znam)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {techSkills.map(skill => (
            <div key={skill} style={{ 
              ...cardStyle, 
              backgroundColor: formData[skill] === 1 ? '#f0fff4' : '#fff',
              borderColor: formData[skill] === 1 ? '#48bb78' : '#e2e8f0'
            }}>
              <label style={{ fontSize: '13px', display: 'block', marginBottom: '5px' }}>{skill}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '10px' }}>NIE</span>
                <input 
                  type="range" 
                  name={skill} 
                  min="0" 
                  max="1" 
                  step="1" 
                  value={formData[skill]} 
                  onChange={handleChange} 
                  style={{ flex: 1, cursor: 'pointer' }} 
                />
                <span style={{ fontSize: '10px' }}>TAK</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px', color: formData[skill] === 1 ? '#2f855a' : '#e53e3e' }}>
                <strong>{formData[skill] === 1 ? "UMIE" : "NIE UMIE"}</strong>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" style={buttonStyle}>Zapisz Dane Formularza</button>
      </form>

    </div>
  );
};

// Style CSS-in-JS
const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
};

const cardStyle = {
  border: '1px solid #e2e8f0',
  padding: '12px',
  borderRadius: '8px',
  transition: 'all 0.3s ease'
};

const buttonStyle = {
  width: '100%',
  padding: '15px',
  marginTop: '30px',
  backgroundColor: '#4a90e2',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default ApplicationForm;