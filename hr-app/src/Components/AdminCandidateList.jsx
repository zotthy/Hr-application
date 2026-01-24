import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

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
  const token = localStorage.getItem("userToken");

  const educationMap = { 1: "Zawodowe", 2: "Średnie", 3: "Licencjat / Inżynier", 4: "Magister", 5: "Doktorat" };
  const seniorityMap = { 1: "Junior / Stażysta", 2: "Mid / Regular", 3: "Senior", 4: "Expert / Lead" };
  const salaryMap = { 1: "Poniżej 3 500 PLN", 2: "3 500 - 5 000 PLN", 3: "5 000 - 7 000 PLN", 4: "7 000 - 10 000 PLN", 5: "10 000 - 15 000 PLN", 6: "15 000 - 20 000 PLN", 7: "20 000 - 30 000 PLN", 8: "Powyżej 30 000 PLN" };

  const techSkills = ["cpp", "cybersecurity", "deepLearning", "ethicalHacking", "java", "linux", "machineLearning", "nlp", "networking", "python", "pytorch", "react", "sql", "tensorFlow"];

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/admin/recruitment/${id}/candidates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          const sorted = (data.applications || []).sort((a, b) => (b.score || 0) - (a.score || 0));
          setCandidates(sorted);
        }
      } catch (error) {
        console.error("Błąd pobierania:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!token) navigate("/login");
    else fetchCandidates();
  }, [id, token, navigate]);

  // --- LOGIKA RANKINGU Z WARUNKIEM MINIMUM SCORE DLA TOP 3 ---
  const top3 = isFromRanked 
    ? candidates.slice(0, 3).filter(c => (c.score || 0) >= 0.90) 
    : [];

  const others = isFromRanked 
    ? candidates.filter(c => !top3.find(t => t.id === c.id))
    : candidates;
  
  const mustInvite = isFromRanked ? others.filter(c => (c.score || 0) >= 0.95) : [];
  const interesting = isFromRanked ? others.filter(c => (c.score || 0) >= 0.90 && (c.score || 0) < 0.95) : [];
  const regular = isFromRanked ? others.filter(c => (c.score || 0) < 0.90) : others;

  const handleViewCV = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/file/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Błąd serwera");
      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    } catch (error) { console.error("Błąd CV:", error); }
  };

  const handleMainAction = async () => {
    if (isArchived) return;
    const confirmMsg = isFromRanked ? "Czy na pewno chcesz zarchiwizować tę rekrutację?" : "Czy chcesz uruchomić proces rankingowania?";
    if (!window.confirm(confirmMsg)) return;
    setIsProcessing(true);
    const endpoint = isFromRanked ? `http://localhost:8080/admin/recruitments/archive/${id}` : `http://localhost:8080/admin/recruitment/${id}/rank`;
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) { alert("Sukces"); navigate("/admin/recruitments"); }
    } catch (error) { alert("Błąd połączenia"); } finally { setIsProcessing(false); }
  };

  const toggleExpand = (candidateId) => setExpandedId(expandedId === candidateId ? null : candidateId);

  const StatBar = ({ label, value }) => (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
        <span style={{ color: "#4a5568", fontWeight: "600" }}>{label}</span>
        <span style={{ color: "#004a99", fontWeight: "bold" }}>{value}/10</span>
      </div>
      <div style={{ width: "100%", height: "8px", backgroundColor: "#edf2f7", borderRadius: "4px" }}>
        <div style={{ width: `${Math.min(value * 10, 100)}%`, height: "100%", backgroundColor: "#004a99", borderRadius: "4px" }} />
      </div>
    </div>
  );

  const renderCandidateCard = (candidate, highlightType = null, index = null) => {
    const isTop1 = highlightType === 'TOP3' && index === 0;
    const scoreVal = (candidate.score || 0);
    
    return (
      <div key={candidate.id} style={{
        ...cardStyle, 
        borderLeft: isTop1 ? "6px solid #fbbf24" : highlightType === 'MUST' ? "6px solid #38a169" : "1px solid #e2e8f0",
        backgroundColor: isTop1 ? "#fffdf0" : "#fff"
      }}>
        <div onClick={() => toggleExpand(candidate.id)} style={headerActionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{...avatarStyle, backgroundColor: isTop1 ? "#fef3c7" : "#f1f5f9"}}>
              {isTop1 ? "🥇" : highlightType === 'TOP3' && index === 1 ? "🥈" : highlightType === 'TOP3' && index === 2 ? "🥉" : candidate.firstName?.[0]}
            </div>
            <div>
              <h3 style={candidateNameStyle}>
                {candidate.firstName} {candidate.lastName} 
                {highlightType === 'TOP3' && <span style={badgeSmall}>ELITA AI</span>}
              </h3>
              <div style={candidateSubInfoStyle}>{candidate.email}</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={smallLabelStyle}>WYNIK AI</div>
              <div style={{
                ...scoreValueStyle, 
                color: scoreVal >= 0.95 ? "#2f855a" : scoreVal >= 0.90 ? "#2b6cb0" : "#4a5568"
              }}>
                {(scoreVal * 100).toFixed(1)}%
              </div>
            </div>
            <div style={{ transform: expandedId === candidate.id ? "rotate(180deg)" : "none", transition: "0.2s" }}>▼</div>
          </div>
        </div>

        {expandedId === candidate.id && (
          <div style={detailsPaneStyle}>
            <div style={detailsGridStyle}>
              <div style={infoSectionStyle}>
                <h4 style={sectionTitleStyle}>Profil kandydata</h4>
                <div style={infoRowStyle}><span>📍 Poziom:</span> <strong>{seniorityMap[candidate.jobRole] || "Nie określono"}</strong></div>
                <div style={infoRowStyle}><span>🎓 Wykształcenie:</span> <strong>{educationMap[candidate.education] || "Nie określono"}</strong></div>
                <div style={infoRowStyle}><span>💰 Oczekiwania:</span> <strong style={{ color: "#2f855a" }}>{salaryMap[candidate.salaryExpectation] || "Brak danych"}</strong></div>
                <div style={{ marginTop: "20px" }}>
                  <StatBar label="Lata doświadczenia" value={candidate.experienceYears} />
                  <StatBar label="Certyfikaty" value={candidate.certifications} />
                  <StatBar label="Projekty" value={candidate.projectsCount} />
                </div>
              </div>
              <div style={infoSectionStyle}>
                <h4 style={sectionTitleStyle}>Umiejętności Techniczne</h4>
                <div style={techContainerStyle}>
                  {techSkills.map(skill => candidate[skill] === 1 && (
                    <span key={skill} style={techBadgeStyle}>{skill.toUpperCase()}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={footerActionStyle}>
              {candidate.fileId ? (
                <button onClick={() => handleViewCV(candidate.fileId)} style={cvButtonStyle}>📄 Podgląd CV (PDF)</button>
              ) : <span style={{ color: "#a0aec0", fontSize: "14px", fontStyle: "italic" }}>Brak załączonego pliku CV</span>}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={pageContainerStyle}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <button onClick={() => navigate(-1)} style={backBtnStyle}>← Powrót</button>

        <div style={headerContentStyle}>
          <div>
            <h1 style={mainTitleStyle}>{jobTitle}</h1>
            <div style={idBadgeStyle}>
              {isArchived ? "ZARCHIWIZOWANO" : isFromRanked ? "ANALIZA AI ZAKOŃCZONA" : "LISTA KANDYDATÓW (OCZEKUJE NA ANALIZĘ)"}
            </div>
          </div>

          {!isArchived && (
            <button
              onClick={handleMainAction}
              disabled={isProcessing || (!isFromRanked && candidates.length === 0)}
              style={{ ...rankButtonStyle, backgroundColor: isFromRanked ? "#718096" : "#38a169" }}
            >
              {isProcessing ? "Przetwarzanie..." : isFromRanked ? "🔒 Archiwizuj Ofertę" : "📊 Generuj Ranking AI"}
            </button>
          )}
        </div>

        {loading ? (
          <div style={loadingTextStyle}>Pobieranie kandydatów...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            
            {isFromRanked ? (
              <>
                {top3.length > 0 && (
                  <>
                    <div style={groupLabelStyle}>🏆 NAJLEPSZE DOPASOWANIE (PODIUM)</div>
                    {top3.map((c, i) => renderCandidateCard(c, 'TOP3', i))}
                  </>
                )}

                {mustInvite.length > 0 && (
                  <>
                    <div style={{...groupLabelStyle, color: "#2f855a", marginTop: "20px"}}>🔥 REKOMENDOWANI (WYNIK {'>'} 95%)</div>
                    {mustInvite.map(c => renderCandidateCard(c, 'MUST'))}
                  </>
                )}

                {interesting.length > 0 && (
                  <>
                    <div style={{...groupLabelStyle, color: "#2b6cb0", marginTop: "20px"}}>⭐ WARCI ZAINTERESOWANIA (90% - 95%)</div>
                    {interesting.map(c => renderCandidateCard(c, 'INTERESTING'))}
                  </>
                )}

                {regular.length > 0 && (
                  <>
                    <div style={{...groupLabelStyle, marginTop: "20px"}}>POZOSTALI KANDYDACI</div>
                    {regular.map(c => renderCandidateCard(c))}
                  </>
                )}
              </>
            ) : (
              candidates.map(candidate => renderCandidateCard(candidate))
            )}
            
            {candidates.length === 0 && <div style={loadingTextStyle}>Brak kandydatów na tę ofertę.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLE ---
const groupLabelStyle = { fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "5px" };
const badgeSmall = { backgroundColor: "#fbbf24", color: "#92400e", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", marginLeft: "10px", verticalAlign: "middle" };
const pageContainerStyle = { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', sans-serif" };
const backBtnStyle = { background: "white", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", marginBottom: "20px", fontWeight: "600" };
const headerContentStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "2px solid #e2e8f0", paddingBottom: "20px" };
const mainTitleStyle = { margin: 0, fontSize: "26px", color: "#1a202c" };
const idBadgeStyle = { color: "#64748b", fontSize: "14px", marginTop: "5px", fontWeight: "500" };
const rankButtonStyle = { color: "white", border: "none", padding: "12px 25px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" };
const cardStyle = { backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "10px", transition: "0.2s" };
const headerActionStyle = { padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" };
const candidateNameStyle = { margin: 0, fontSize: "18px", color: "#2d3748" };
const candidateSubInfoStyle = { fontSize: "14px", color: "#718096" };
const avatarStyle = { width: "45px", height: "45px", backgroundColor: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#004a99" };
const scoreValueStyle = { fontSize: "20px", fontWeight: "800", color: "#38a169" };
const smallLabelStyle = { fontSize: "10px", color: "#a0aec0", fontWeight: "bold" };
const detailsPaneStyle = { padding: "25px", backgroundColor: "#fafafa", borderTop: "1px solid #f0f0f0" };
const detailsGridStyle = { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px" };
const infoSectionStyle = { display: "flex", flexDirection: "column" };
const sectionTitleStyle = { fontSize: "13px", textTransform: "uppercase", color: "#94a3b8", letterSpacing: "1px", marginBottom: "15px" };
const infoRowStyle = { marginBottom: "10px", fontSize: "15px", color: "#4a5568", display: "flex", justifyContent: "space-between" };
const techContainerStyle = { display: "flex", flexWrap: "wrap", gap: "8px" };
const techBadgeStyle = { backgroundColor: "#004a99", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold" };
const footerActionStyle = { marginTop: "30px", display: "flex", justifyContent: "flex-end", borderTop: "1px solid #eee", paddingTop: "20px" };
const cvButtonStyle = { border: "none", backgroundColor: "#1a202c", color: "white", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", transition: "0.2s" };
const loadingTextStyle = { textAlign: "center", padding: "100px", fontWeight: "bold", color: "#64748b" };

export default AdminCandidateList;