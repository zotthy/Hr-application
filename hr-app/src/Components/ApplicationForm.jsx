import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ApplicationForm = () => {
  const { recruitmentId } = useParams(); // String z URL (np. REC-2025-001)
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pobieramy liczbowe ID (np. 1) przekazane w state z JobDetails
  const numericId = location.state?.numericId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // Backend zgłasza błąd jobId, więc upewniamy się, że to pole tu jest:
    jobId: numericId || null, 
    recruitmentIdString: recruitmentId, 
    experienceYears: 1,
    education: 0,
    certifications: 0,
    jobRole: 0,
    salaryExpectation: 0,
    projectsCount: 0,
    cpp: 0, cybersecurity: 0, deepLearning: 0, ethicalHacking: 0, 
    java: 0, linux: 0, machineLearning: 0, nlp: 0, networking: 0, 
    python: 0, pytorch: 0, react: 0, sql: 0, tensorFlow: 0
  });

  // Jeśli numericId pojawi się później, aktualizujemy formData
  useEffect(() => {
    if (numericId) {
      setFormData(prev => ({ ...prev, jobId: Number(numericId) }));
    }
  }, [numericId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'range' || type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!numericId) {
      alert("Błąd: Nie można zidentyfikować ID oferty. Wróć do szczegółów.");
      return;
    }

    setIsSubmitting(true);

    // Tworzymy finalny obiekt do wysłania, upewniając się, że jobId to liczba
    const payload = {
      ...formData,
      jobId: Number(numericId)
    };

    try {
      // WYSYŁKA NA: http://localhost:8080/candidate/apply-to-recruitment/1
      const response = await fetch(`http://localhost:8080/candidate/apply-to-recruitment/${numericId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      } else {
        // Wyświetlamy co dokładnie odpowiedział serwer (pomocne w debugowaniu)
        const errorText = await response.text();
        console.error("Błąd serwera:", errorText);
        alert(`Wystąpił błąd po stronie serwera. Sprawdź czy pole jobId w Javie jest typu Long.`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Błąd połączenia:", error);
      alert("Błąd połączenia z serwerem.");
      setIsSubmitting(false);
    }
  };

  const mainStats = ["experienceYears", "education", "certifications", "jobRole", "salaryExpectation", "projectsCount"];
  const techSkills = ["cpp", "cybersecurity", "deepLearning", "ethicalHacking", "java", "linux", "machineLearning", "nlp", "networking", "python", "pytorch", "react", "sql", "tensorFlow"];

  if (isSuccess) {
    return (
      <div style={containerStyle}>
        <div style={{ ...formBoxStyle, textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '70px', color: '#48bb78', marginBottom: '20px' }}>✓</div>
          <h2 style={{ color: '#00285e', marginBottom: '15px' }}>Aplikacja wysłana!</h2>
          <p style={{ color: '#4a5568', fontSize: '18px' }}>Dziękujemy za przesłanie zgłoszenia.</p>
          <div style={{ marginTop: '30px', color: '#718096' }}>Przekierowanie do listy ofert...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formBoxStyle}>
        <h2 style={{ textAlign: 'center', color: '#00285e' }}>Formularz Rekrutacyjny</h2>
        <p style={{ textAlign: 'center', color: '#718096', marginBottom: '30px' }}>
          ID Oferty: <strong>{numericId}</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <div>
            <label style={labelStyle}>Imię</label>
            <input style={inputStyle} name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label style={labelStyle}>Nazwisko</label>
            <input style={inputStyle} name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <h3 style={sectionTitleStyle}>Kwalifikacje (0-10)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {mainStats.map(stat => (
            <div key={stat} style={cardStyle}>
              <label style={{ fontSize: '14px', fontWeight: 'bold' }}>{stat}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="range" name={stat} min="0" max="10" value={formData[stat]} onChange={handleChange} style={{ flex: 1 }} />
                <span style={{ fontWeight: 'bold', color: '#004a99' }}>{formData[stat]}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 style={sectionTitleStyle}>Umiejętności Techniczne</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {techSkills.map(skill => (
            <div key={skill} style={{ ...cardStyle, backgroundColor: formData[skill] === 1 ? '#f0fff4' : '#fff' }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>{skill.toUpperCase()}</label>
              <input type="range" name={skill} min="0" max="1" step="1" value={formData[skill]} onChange={handleChange} style={{ width: '100%' }} />
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          style={{ ...buttonStyle, backgroundColor: isSubmitting ? '#cbd5e0' : '#ff5a00' }}
        >
          {isSubmitting ? "Wysyłanie..." : "Wyślij moją aplikację"}
        </button>
      </form>
    </div>
  );
};

// Style (bez zmian)
const containerStyle = { backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '40px 20px', display: 'flex', justifyContent: 'center' };
const formBoxStyle = { width: '100%', maxWidth: '900px', backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' };
const sectionTitleStyle = { color: '#00285e', fontSize: '18px', borderBottom: '1px solid #edf2f7', paddingBottom: '10px', marginBottom: '20px' };
const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '5px', display: 'block' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box' };
const cardStyle = { border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px' };
const buttonStyle = { width: '100%', padding: '16px', marginTop: '30px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' };

export default ApplicationForm;