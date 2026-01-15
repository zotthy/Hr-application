import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ApplicationForm = () => {
  const { recruitmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const numericId = location.state?.numericId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    jobId: numericId || null, 
    recruitmentIdString: recruitmentId, 
    experienceYears: 0, 
    education: 1, 
    certifications: 0,
    jobRole: 1, 
    salaryExpectation: 3, // Domyślnie próg nr 3 (5000-7000)
    projectsCount: 0,
    cpp: 0, cybersecurity: 0, deepLearning: 0, ethicalHacking: 0, 
    java: 0, linux: 0, machineLearning: 0, nlp: 0, networking: 0, 
    python: 0, pytorch: 0, react: 0, sql: 0, tensorFlow: 0
  });

  useEffect(() => {
    if (numericId) {
      setFormData(prev => ({ ...prev, jobId: Number(numericId) }));
    }
  }, [numericId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Wszystkie pola wyboru (select) i suwaki traktujemy jako liczby
    const isNumeric = type === 'range' || type === 'number' || 
                      ['education', 'jobRole', 'salaryExpectation'].includes(name);
    
    setFormData(prev => ({
      ...prev,
      [name]: isNumeric ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numericId) return alert("Błąd ID oferty.");
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:8080/candidate/apply-to-recruitment/${numericId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      } else {
        alert("Wystąpił błąd serwera.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Błąd połączenia.");
      setIsSubmitting(false);
    }
  };

  // Suwaki, które zostały w formie numerycznej
  const labelMap = {
    experienceYears: "Lata doświadczenia",
    certifications: "Liczba certyfikatów",
    projectsCount: "Projekty w portfolio"
  };

  const mainStats = Object.keys(labelMap);
  const techSkills = ["cpp", "cybersecurity", "deepLearning", "ethicalHacking", "java", "linux", "machineLearning", "nlp", "networking", "python", "pytorch", "react", "sql", "tensorFlow"];

  if (isSuccess) {
    return (
      <div style={containerStyle}>
        <div style={successBoxStyle}>
          <div style={checkIconStyle}>✓</div>
          <h2 style={{ color: '#00285e' }}>Aplikacja wysłana!</h2>
          <p style={{ color: '#4a5568' }}>Dziękujemy. Twoje zgłoszenie trafiło do rekrutera.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formBoxStyle}>
        <div style={formHeaderStyle}>
          <h2 style={{ margin: 0, color: '#00285e' }}>Aplikuj na ofertę</h2>
          <p style={{ margin: '5px 0 0 0', color: '#718096' }}>Nr rekrutacji: <strong>{recruitmentId}</strong></p>
        </div>

        {/* Sekcja 1: Dane i Wybory Progu */}
        <h3 style={sectionTitleStyle}>Dane podstawowe</h3>
        <div style={gridRowStyle}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Imię</label>
            <input style={inputStyle} name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Jan" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Nazwisko</label>
            <input style={inputStyle} name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Kowalski" />
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Adres e-mail</label>
          <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jan.kowalski@example.com" />
        </div>

        <div style={gridRowStyle}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Poziom (Seniority)</label>
            <select style={inputStyle} name="jobRole" value={formData.jobRole} onChange={handleChange}>
              <option value="1">Junior</option>
              <option value="2">Mid</option>
              <option value="3">Senior</option>
              <option value="4">Expert</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Wykształcenie</label>
            <select style={inputStyle} name="education" value={formData.education} onChange={handleChange}>
              <option value="1">Zawodowe</option>
              <option value="2">Średnie</option>
              <option value="3">Licencjat / Inżynier</option>
              <option value="4">Magister</option>
              <option value="5">Doktorat</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={labelStyle}>Oczekiwania finansowe (Miesięcznie PLN)</label>
          <select style={inputStyle} name="salaryExpectation" value={formData.salaryExpectation} onChange={handleChange}>
            <option value="1">Poniżej 3 500 PLN</option>
            <option value="2">3 500 - 5 000 PLN</option>
            <option value="3">5 000 - 7 000 PLN</option>
            <option value="4">7 000 - 10 000 PLN</option>
            <option value="5">10 000 - 15 000 PLN</option>
            <option value="6">15 000 - 20 000 PLN</option>
            <option value="7">20 000 - 30 000 PLN</option>
            <option value="8">Powyżej 30 000 PLN</option>
          </select>
        </div>

        {/* Sekcja 2: Suwaki Ilościowe */}
        <h3 style={sectionTitleStyle}>Doświadczenie</h3>
        <div style={statsGridStyle}>
          {mainStats.map(stat => (
            <div key={stat} style={statCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={statLabelStyle}>{labelMap[stat]}</span>
                <span style={statValueStyle}>{formData[stat]}</span>
              </div>
              <input 
                type="range" name={stat} min="0" max="10" 
                value={formData[stat]} onChange={handleChange} 
                style={rangeInputStyle} 
              />
            </div>
          ))}
        </div>

        {/* Sekcja 3: Technologie */}
        <h3 style={sectionTitleStyle}>Technologie</h3>
        <div style={techGridStyle}>
          {techSkills.map(skill => (
            <div 
              key={skill} 
              onClick={() => setFormData(p => ({ ...p, [skill]: p[skill] === 1 ? 0 : 1 }))}
              style={{
                ...techBadgeStyle,
                backgroundColor: formData[skill] === 1 ? '#004a99' : '#fff',
                color: formData[skill] === 1 ? '#fff' : '#4a5568',
                borderColor: formData[skill] === 1 ? '#004a99' : '#e2e8f0',
              }}
            >
              {skill.toUpperCase()}
              {formData[skill] === 1 && <span style={{ marginLeft: '8px' }}>✓</span>}
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          style={buttonStyle}
        >
          {isSubmitting ? "Wysyłanie..." : "Złóż aplikację"}
        </button>
      </form>
    </div>
  );
};

// --- STYLE ---
const containerStyle = { backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '60px 20px', display: 'flex', justifyContent: 'center', fontFamily: "'Inter', sans-serif" };
const formBoxStyle = { width: '100%', maxWidth: '850px', backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' };
const formHeaderStyle = { borderBottom: '3px solid #ff5a00', paddingBottom: '20px', marginBottom: '35px' };
const gridRowStyle = { display: 'flex', gap: '20px', marginBottom: '20px' };
const labelStyle = { fontSize: '13px', fontWeight: '700', color: '#4a5568', marginBottom: '8px', display: 'block', textTransform: 'uppercase' };
const inputStyle = { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb', outline: 'none', fontSize: '15px', boxSizing: 'border-box' };
const sectionTitleStyle = { color: '#00285e', fontSize: '19px', fontWeight: '800', margin: '45px 0 20px 0' };
const statsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '15px' }; // Zmienione na 1 kolumnę dla lepszej czytelności przy suwakach
const statCardStyle = { padding: '15px', borderRadius: '16px', backgroundColor: '#f9fafb', border: '1px solid #e2e8f0' };
const statLabelStyle = { fontSize: '14px', fontWeight: '600', color: '#2d3748' };
const statValueStyle = { color: '#004a99', fontWeight: '900' };
const rangeInputStyle = { width: '100%', cursor: 'pointer', accentColor: '#ff5a00' };
const techGridStyle = { display: 'flex', flexWrap: 'wrap', gap: '10px' };
const techBadgeStyle = { padding: '12px 20px', borderRadius: '40px', border: '1px solid', fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' };
const buttonStyle = { width: '100%', padding: '20px', marginTop: '55px', backgroundColor: '#ff5a00', color: 'white', border: 'none', borderRadius: '16px', fontSize: '17px', fontWeight: '800', cursor: 'pointer' };
const successBoxStyle = { textAlign: 'center', backgroundColor: '#fff', padding: '80px 40px', borderRadius: '30px', maxWidth: '500px' };
const checkIconStyle = { fontSize: '90px', color: '#38a169', marginBottom: '25px' };

export default ApplicationForm;