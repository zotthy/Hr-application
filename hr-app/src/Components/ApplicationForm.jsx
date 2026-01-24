import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ApplicationForm = () => {
  // ... (cała logika useEffect, techSkills i formData pozostaje bez zmian)
  const { recruitmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const numericId = location.state?.numericId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [appMode, setAppMode] = useState('manual');
  const [selectedFile, setSelectedFile] = useState(null);

  const techSkills = [
    "cpp", "cybersecurity", "deepLearning", "ethicalHacking", "java", "linux", 
    "machineLearning", "nlp", "networking", "python", "pytorch", "react", "sql", "tensorFlow"
  ];

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    jobId: numericId || null, 
    experienceYears: 0, education: 1, certifications: 0,
    jobRole: 1, salaryExpectation: 3, projectsCount: 0,
    cpp: 0, cybersecurity: 0, deepLearning: 0, ethicalHacking: 0, 
    java: 0, linux: 0, machineLearning: 0, nlp: 0, networking: 0, 
    python: 0, pytorch: 0, react: 0, sql: 0, tensorFlow: 0
  });

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const isNumeric = type === 'range' || type === 'number' || ['education', 'jobRole', 'salaryExpectation', 'experienceYears', 'certifications', 'projectsCount'].includes(name);
    setFormData(prev => ({ ...prev, [name]: isNumeric ? Number(value) : value }));
  };

  const handleResponse = (response) => {
    if (response.ok) {
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } else {
      alert("Wystąpił błąd podczas składania aplikacji.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targetId = numericId || formData.jobId;
    if (!targetId) return alert("Błąd ID oferty.");
    setIsSubmitting(true);

    try {
      if (appMode === 'cv') {
        if (!selectedFile) {
          alert("Proszę załączyć plik CV.");
          setIsSubmitting(false);
          return;
        }
        const data = new FormData();
        const applicationJson = JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          salaryExpectation: formData.salaryExpectation // Przesyłamy to również w trybie CV
        });
        data.append('application', new Blob([applicationJson], { type: 'application/json' }));
        data.append('file', selectedFile);
        const response = await fetch(`http://localhost:8080/candidate/apply-to-recruitmentCv/${targetId}`, {
          method: 'POST',
          body: data 
        });
        handleResponse(response);
      } else {
        const response = await fetch(`http://localhost:8080/candidate/apply-to-recruitment/${targetId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        handleResponse(response);
      }
    } catch (error) {
      alert("Błąd połączenia z serwerem.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={containerStyle}>
        <div style={successBoxStyle}>
          <div style={checkIconStyle}>✓</div>
          <h2 style={{ color: '#00285e' }}>Aplikacja wysłana!</h2>
          <p style={{ color: '#4a5568' }}>Dziękujemy za przesłanie zgłoszenia.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={formBoxStyle}>
        <div style={formHeaderStyle}>
          <h2 style={{ color: '#00285e' }}>Aplikuj na ofertę</h2>
          <p style={{ color: '#718096' }}>Nr rekrutacji: <strong>{recruitmentId}</strong></p>
        </div>

        <div style={toggleContainerStyle}>
          <button 
            type="button"
            onClick={() => setAppMode('manual')}
            style={{...toggleButtonStyle, backgroundColor: appMode === 'manual' ? '#ff5a00' : '#e2e8f0', color: appMode === 'manual' ? '#fff' : '#4a5568'}}
          >
            Pełny formularz
          </button>
          <button 
            type="button"
            onClick={() => setAppMode('cv')}
            style={{...toggleButtonStyle, backgroundColor: appMode === 'cv' ? '#ff5a00' : '#e2e8f0', color: appMode === 'cv' ? '#fff' : '#4a5568'}}
          >
            Szybka aplikacja z CV
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 style={sectionTitleStyle}>Twoje dane</h3>
          <div style={gridRowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Imię</label>
              <input style={inputStyle} name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Nazwisko</label>
              <input style={inputStyle} name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Adres e-mail</label>
            <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          {/* POLE OCZEKIWAŃ FINANSOWYCH - teraz dostępne zawsze pod e-mailem */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Oczekiwania finansowe (PLN/mc)</label>
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

          {appMode === 'cv' ? (
            <div style={cvUploadSectionStyle}>
              <h3 style={sectionTitleStyle}>Załącz plik CV (PDF)</h3>
              <p style={{fontSize: '14px', color: '#718096', marginBottom: '15px'}}>Nasze AI automatycznie przeanalizuje Twoje umiejętności na podstawie pliku.</p>
              <input type="file" accept=".pdf" onChange={handleFileChange} style={fileInputStyle} required />
            </div>
          ) : (
            <>
              <h3 style={sectionTitleStyle}>Informacje dodatkowe</h3>
              <div style={gridRowStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Poziom (Seniority)</label>
                  <select style={inputStyle} name="jobRole" value={formData.jobRole} onChange={handleChange}>
                    <option value="1">Junior</option><option value="2">Mid</option><option value="3">Senior</option><option value="4">Expert</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Wykształcenie</label>
                  <select style={inputStyle} name="education" value={formData.education} onChange={handleChange}>
                    <option value="1">Zawodowe</option><option value="2">Średnie</option><option value="3">Inżynier/Licencjat</option><option value="4">Magister</option><option value="5">Doktorat</option>
                  </select>
                </div>
              </div>

              <h3 style={sectionTitleStyle}>Doświadczenie i projekty</h3>
              <div style={statsGridStyle}>
                {[
                  { name: 'experienceYears', label: 'Lata doświadczenia' },
                  { name: 'certifications', label: 'Certyfikaty' },
                  { name: 'projectsCount', label: 'Liczba projektów' }
                ].map(stat => (
                  <div key={stat.name} style={statCardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={statLabelStyle}>{stat.label}</span>
                      <span style={statValueStyle}>{formData[stat.name]}</span>
                    </div>
                    <input type="range" name={stat.name} min="0" max="20" value={formData[stat.name]} onChange={handleChange} style={rangeInputStyle} />
                  </div>
                ))}
              </div>
              
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
                    {skill.toUpperCase().replace(/([A-Z])/g, ' $1')}
                    {formData[skill] === 1 && <span style={{ marginLeft: '8px' }}>✓</span>}
                  </div>
                ))}
              </div>
            </>
          )}

          <button type="submit" disabled={isSubmitting} style={buttonStyle}>
            {isSubmitting ? "Wysyłanie..." : "Złóż aplikację"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ... (style pozostają bez zmian)
const containerStyle = { backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '60px 20px', display: 'flex', justifyContent: 'center', fontFamily: "'Inter', sans-serif" };
const formBoxStyle = { width: '100%', maxWidth: '850px', backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' };
const formHeaderStyle = { borderBottom: '3px solid #ff5a00', paddingBottom: '20px', marginBottom: '35px' };
const toggleContainerStyle = { display: 'flex', gap: '10px', marginBottom: '30px', backgroundColor: '#e2e8f0', padding: '5px', borderRadius: '12px' };
const toggleButtonStyle = { flex: 1, padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', transition: '0.3s' };
const cvUploadSectionStyle = { padding: '40px 20px', border: '2px dashed #cbd5e0', borderRadius: '20px', textAlign: 'center', backgroundColor: '#f8fafc' };
const gridRowStyle = { display: 'flex', gap: '20px', marginBottom: '20px' };
const labelStyle = { fontSize: '13px', fontWeight: '700', color: '#4a5568', marginBottom: '8px', display: 'block', textTransform: 'uppercase' };
const inputStyle = { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb', fontSize: '15px', boxSizing: 'border-box' };
const sectionTitleStyle = { color: '#00285e', fontSize: '19px', fontWeight: '800', margin: '45px 0 20px 0' };
const statsGridStyle = { display: 'grid', gridTemplateColumns: '1fr', gap: '15px' };
const statCardStyle = { padding: '15px', borderRadius: '16px', backgroundColor: '#f9fafb', border: '1px solid #e2e8f0' };
const statLabelStyle = { fontSize: '14px', fontWeight: '600', color: '#2d3748' };
const statValueStyle = { color: '#004a99', fontWeight: '900' };
const rangeInputStyle = { width: '100%', cursor: 'pointer', accentColor: '#ff5a00', marginTop: '10px' };
const techGridStyle = { display: 'flex', flexWrap: 'wrap', gap: '10px' };
const techBadgeStyle = { padding: '12px 20px', borderRadius: '40px', border: '1px solid', fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' };
const buttonStyle = { width: '100%', padding: '20px', marginTop: '55px', backgroundColor: '#ff5a00', color: 'white', border: 'none', borderRadius: '16px', fontSize: '17px', fontWeight: '800', cursor: 'pointer' };
const successBoxStyle = { textAlign: 'center', backgroundColor: '#fff', padding: '80px 40px', borderRadius: '30px', maxWidth: '500px' };
const checkIconStyle = { fontSize: '90px', color: '#38a169', marginBottom: '25px' };
const fileInputStyle = { marginTop: '15px' };

export default ApplicationForm;