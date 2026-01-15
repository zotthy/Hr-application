import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const AdminCandidateList = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const jobTitle = location.state?.jobTitle || "Szczegóły rekrutacji";
  const isFromRanked = location.state?.isFromRanked || false; 
  const isArchived = location.state?.isArchived || false; 
  
  const [candidates, setCandidates] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem('userToken');

  // --- MAPOWANIA DANYCH (Zgodne z formularzem kandydata) ---
  const educationMap = {
    1: "Zawodowe",
    2: "Średnie",
    3: "Licencjat / Inżynier",
    4: "Magister",
    5: "Doktorat"
  };

  const seniorityMap = {
    1: "Junior / Stażysta",
    2: "Mid / Regular",
    3: "Senior",
    4: "Expert / Lead"
  };

  const salaryMap = {
    1: "Poniżej 3 500 PLN",
    2: "3 500 - 5 000 PLN",
    3: "5 000 - 7 000 PLN",
    4: "7 000 - 10 000 PLN",
    5: "10 000 - 15 000 PLN",
    6: "15 000 - 20 000 PLN",
    7: "20 000 - 30 000 PLN",
    8: "Powyżej 30 000 PLN"
  };

  const techSkills = ["cpp", "cybersecurity", "deepLearning", "ethicalHacking", "java", "linux", "machineLearning", "nlp", "networking", "python", "pytorch", "react", "sql", "tensorFlow"];

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
        console.error("Błąd pobierania:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!token) navigate('/login');
    else fetchCandidates();
  }, [id, token, navigate]);

  const handleMainAction = async () => {
    if (isArchived) return;
    const confirmMsg = isFromRanked 
      ? "Czy na pewno chcesz zarchiwizować tę rekrutację?" 
      : "Czy chcesz uruchomić proces rankingowania?";
    
    if (!window.confirm(confirmMsg)) return;
    setIsProcessing(true);
    
    const endpoint = isFromRanked 
      ? `http://localhost:8080/admin/recruitments/archive/${id}` 
      : `http://localhost:8080/admin/recruitment/${id}/rank`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        alert("Operacja zakończona sukcesem.");
        navigate('/admin/recruitments'); 
      }
    } catch (error) {
      alert("Błąd połączenia.");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleExpand = (candidateId) => {
    setExpandedId(expandedId === candidateId ? null : candidateId);
  };

  const StatBar = ({ label, value }) => (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
        <span style={{ color: '#4a5568', fontWeight: '600' }}>{label}</span>
        <span style={{ color: '#004a99', fontWeight: 'bold' }}>{value}/10</span>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '4px' }}>
        <div style={{ width: `${value * 10}%`, height: '100%', backgroundColor: '#004a99', borderRadius: '4px' }} />
      </div>
    </div>
  );

  return (
    <div style={pageContainerStyle}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} style={backBtnStyle}>← Powrót</button>
        
        <div style={headerContentStyle}>
          <div>
            <h1 style={mainTitleStyle}>{jobTitle}</h1>
            <div style={idBadgeStyle}>
                Status: {isArchived ? "ZARCHIWIZOWANO" : (isFromRanked ? "RANKING WYGENEROWANY" : "OCZEKUJE NA RANKING")}
            </div>
          </div>
          
          {!isArchived && (
            <button 
                onClick={handleMainAction} 
                disabled={isProcessing || (!isFromRanked && candidates.length === 0)} 
                style={{ ...rankButtonStyle, backgroundColor: isFromRanked ? '#e53e3e' : '#38a169' }}
            >
                {isProcessing ? "Przetwarzanie..." : (isFromRanked ? "🔒 Archiwizuj Ofertę" : "📊 Generuj Ranking")}
            </button>
          )}
        </div>

        {loading ? (
          <div style={loadingTextStyle}>Pobieranie kandydatów...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {candidates.map(candidate => (
              <div key={candidate.id} style={cardStyle}>
                <div onClick={() => toggleExpand(candidate.id)} style={headerActionStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={avatarStyle}>{candidate.firstName?.[0]}{candidate.lastName?.[0]}</div>
                    <div>
                      <h3 style={candidateNameStyle}>{candidate.firstName} {candidate.lastName}</h3>
                      <div style={candidateSubInfoStyle}>{candidate.email}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={smallLabelStyle}>WYNIK</div>
                      <div style={scoreValueStyle}>{candidate.score || "N/A"}</div>
                    </div>
                    <div style={{ transform: expandedId === candidate.id ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>▼</div>
                  </div>
                </div>

                {expandedId === candidate.id && (
                  <div style={detailsPaneStyle}>
                    <div style={detailsGridStyle}>
                      {/* LEWA KOLUMNA: PROFIL I PŁACA */}
                      <div style={infoSectionStyle}>
                        <h4 style={sectionTitleStyle}>Profil kandydata</h4>
                        <div style={infoRowStyle}><span>📍 Poziom:</span> <strong>{seniorityMap[candidate.jobRole] || "Nie określono"}</strong></div>
                        <div style={infoRowStyle}><span>🎓 Wykształcenie:</span> <strong>{educationMap[candidate.education] || "Nie określono"}</strong></div>
                        <div style={infoRowStyle}><span>💰 Oczekiwania:</span> <strong style={{color: '#2f855a'}}>{salaryMap[candidate.salaryExpectation] || "Brak danych"}</strong></div>
                        
                        <div style={{marginTop: '20px'}}>
                          <StatBar label="Lata doświadczenia" value={candidate.experienceYears} />
                          <StatBar label="Certyfikaty" value={candidate.certifications} />
                          <StatBar label="Projekty" value={candidate.projectsCount} />
                        </div>
                      </div>

                      {/* PRAWA KOLUMNA: TECH SKILLS */}
                      <div style={infoSectionStyle}>
                        <h4 style={sectionTitleStyle}>Umiejętności Techniczne</h4>
                        <div style={techContainerStyle}>
                          {techSkills.map(skill => (
                            candidate[skill] === 1 && <span key={skill} style={techBadgeStyle}>{skill.toUpperCase()}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLE ---
const pageContainerStyle = { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" };
const backBtnStyle = { background: 'white', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600' };
const headerContentStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px' };
const mainTitleStyle = { margin: 0, fontSize: '26px', color: '#1a202c' };
const idBadgeStyle = { color: '#64748b', fontSize: '14px', marginTop: '5px', fontWeight: '500' };
const rankButtonStyle = { color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const cardStyle = { backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' };
const headerActionStyle = { padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' };
const candidateNameStyle = { margin: 0, fontSize: '18px', color: '#2d3748' };
const candidateSubInfoStyle = { fontSize: '14px', color: '#718096' };
const avatarStyle = { width: '45px', height: '45px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#004a99' };
const scoreValueStyle = { fontSize: '20px', fontWeight: '800', color: '#38a169' };
const smallLabelStyle = { fontSize: '10px', color: '#a0aec0', fontWeight: 'bold' };
const detailsPaneStyle = { padding: '25px', backgroundColor: '#fafafa', borderTop: '1px solid #f0f0f0' };
const detailsGridStyle = { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' };
const infoSectionStyle = { display: 'flex', flexDirection: 'column' };
const sectionTitleStyle = { fontSize: '13px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '15px' };
const infoRowStyle = { marginBottom: '10px', fontSize: '15px', color: '#4a5568', display: 'flex', justifyContent: 'space-between' };
const techContainerStyle = { display: 'flex', flexWrap: 'wrap', gap: '8px' };
const techBadgeStyle = { backgroundColor: '#004a99', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' };
const footerActionStyle = { marginTop: '30px', display: 'flex', justifyContent: 'flex-end' };
const cvButtonStyle = { textDecoration: 'none', backgroundColor: '#1a202c', color: 'white', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' };
const loadingTextStyle = { textAlign: 'center', padding: '100px', fontWeight: 'bold', color: '#64748b' };

export default AdminCandidateList;