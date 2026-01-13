import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const AdminCandidateList = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const jobTitle = location.state?.jobTitle || "Szczegóły rekrutacji";
  const [candidates, setCandidates] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/admin/recruitment/${id}/candidates`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          const finalData = data.applications || [];
          setCandidates(finalData);
        }
      } catch (error) {
        console.error("Błąd pobierania kandydatów:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!token) navigate('/login');
    else fetchCandidates();
  }, [id, token, navigate]);

  const toggleExpand = (candidateId) => {
    setExpandedId(expandedId === candidateId ? null : candidateId);
  };

  const skillKeys = [
    'java', 'sql', 'python', 'react', 'cpp', 'linux', 
    'cybersecurity', 'machineLearning', 'deepLearning', 
    'ethicalHacking', 'networking', 'pytorch', 'tensorFlow'
  ];

  // Komponent pomocniczy dla paska postępu
  const StatBar = ({ label, value }) => (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
        <span style={{ color: '#4a5568', fontWeight: '500' }}>{label}</span>
        <span style={{ color: '#004a99', fontWeight: 'bold' }}>{value}/10</span>
      </div>
      <div style={{ width: '100%', height: '6px', backgroundColor: '#edf2f7', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${value * 10}%`, height: '100%', backgroundColor: '#004a99', transition: 'width 0.5s ease-out' }} />
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <button onClick={() => navigate(-1)} style={backBtnStyle}>
          <span style={{ marginRight: '8px' }}>←</span> Powrót do listy ofert
        </button>
        
        <div style={headerContentStyle}>
          <h1 style={mainTitleStyle}>
            Kandydaci: <span style={{ color: '#004a99' }}>{jobTitle}</span>
          </h1>
          <div style={idBadgeStyle}>ID Ofert: #{id}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={loadingStyle}>Pobieranie bazy kandydatów...</div>
          ) : candidates.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📁</div>
              Brak zgłoszeń dla tej rekrutacji.
            </div>
          ) : (
            candidates.map(candidate => (
              <div key={candidate.id} style={{
                ...cardStyle,
                borderLeft: expandedId === candidate.id ? '6px solid #004a99' : '6px solid transparent'
              }}>
                {/* NAGŁÓWEK KARTY */}
                <div onClick={() => toggleExpand(candidate.id)} style={headerActionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={avatarStyle}>
                      {candidate.firstName?.[0]}{candidate.lastName?.[0]}
                    </div>
                    <div>
                      <h3 style={candidateNameStyle}>
                        {candidate.firstName} {candidate.lastName}
                      </h3>
                      <div style={{ display: 'flex', gap: '15px', marginTop: '4px' }}>
                        <span style={subInfoStyle}>✉ {candidate.email}</span>
                        <span style={subInfoStyle}>🕒 Doświadczenie: {candidate.experienceYears} lat</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#a0aec0', transform: expandedId === candidate.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}>
                    ▼
                  </div>
                </div>

                {/* SZCZEGÓŁY PO ROZWINIĘCIU */}
                {expandedId === candidate.id && (
                  <div style={detailsPaneStyle}>
                    <div style={gridStyle}>
                      {/* Statystyki */}
                      <div>
                        <h4 style={subTitleStyle}>Punkty kwalifikacji</h4>
                        <StatBar label="Edukacja" value={candidate.education} />
                        <StatBar label="Certyfikaty" value={candidate.certifications} />
                        <StatBar label="Projekty" value={candidate.projectsCount} />
                        <StatBar label="Oczekiwania finansowe" value={candidate.salaryExpectation} />
                      </div>

                      {/* Skille */}
                      <div>
                        <h4 style={subTitleStyle}>Technologie i narzędzia</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {skillKeys.map(skill => (
                            candidate[skill] === 1 ? (
                              <span key={skill} style={skillTagStyle}>
                                {skill.replace(/([A-Z])/g, ' $1').toUpperCase()}
                              </span>
                            ) : null
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={footerActionStyle}>
                      <a 
                        href={`http://localhost:8080/admin/candidates/cv/${candidate.id}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={cvButtonStyle}
                      >
                        Pobierz CV (PDF)
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// --- NOWE / ZAKTUALIZOWANE STYLE ---
const backBtnStyle = { 
  background: 'white', border: '1px solid #e2e8f0', color: '#4a5568', 
  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', 
  fontWeight: '600', marginBottom: '20px', fontSize: '14px', 
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.2s'
};

const headerContentStyle = { 
  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', 
  marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px' 
};

const mainTitleStyle = { margin: 0, fontSize: '28px', color: '#1a202c', fontWeight: '800' };

const idBadgeStyle = { 
  backgroundColor: '#cbd5e0', color: '#4a5568', padding: '4px 12px', 
  borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' 
};

const cardStyle = { 
  backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
  overflow: 'hidden', transition: 'all 0.3s' 
};

const headerActionStyle = { 
  padding: '24px', display: 'flex', justifyContent: 'space-between', 
  alignItems: 'center', cursor: 'pointer' 
};

const candidateNameStyle = { margin: 0, fontSize: '20px', color: '#2d3748', fontWeight: '700' };

const avatarStyle = { 
  width: '56px', height: '56px', backgroundColor: '#ebf4ff', 
  borderRadius: '12px', display: 'flex', alignItems: 'center', 
  justifyContent: 'center', fontWeight: 'bold', color: '#004a99', fontSize: '20px' 
};

const subInfoStyle = { fontSize: '14px', color: '#718096', fontWeight: '400' };

const detailsPaneStyle = { padding: '24px', backgroundColor: '#f8fafc', borderTop: '1px solid #edf2f7' };

const gridStyle = { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' };

const subTitleStyle = { 
  fontSize: '11px', color: '#a0aec0', textTransform: 'uppercase', 
  letterSpacing: '1.2px', marginBottom: '20px', fontWeight: '800' 
};

const skillTagStyle = { 
  backgroundColor: '#fff', color: '#2d3748', padding: '6px 12px', 
  borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', 
  border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' 
};

const footerActionStyle = { 
  marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', 
  display: 'flex', justifyContent: 'flex-end' 
};

const cvButtonStyle = { 
  backgroundColor: '#004a99', color: 'white', padding: '12px 24px', 
  borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', 
  fontSize: '14px', boxShadow: '0 4px 14px 0 rgba(0,74,153,0.39)', transition: '0.2s' 
};

const emptyStateStyle = { 
  textAlign: 'center', padding: '80px', backgroundColor: 'white', 
  borderRadius: '16px', color: '#a0aec0', fontWeight: '500', border: '2px dashed #e2e8f0' 
};

const loadingStyle = { textAlign: 'center', padding: '40px', color: '#004a99', fontWeight: 'bold' };

export default AdminCandidateList;