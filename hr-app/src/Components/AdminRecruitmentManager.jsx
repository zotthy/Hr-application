import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRecruitmentManager = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [activeTab, setActiveTab] = useState("OPEN");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const fetchData = async (status) => {
    setLoading(true);
    const urls = {
      OPEN: "http://localhost:8080/admin/recruitments/open",
      CLOSED: "http://localhost:8080/admin/recruitments/archived",
      RANKED: "http://localhost:8080/admin/recruitments/ranked",
    };

    try {
      if (status === "ALL") {
        const [resOpen, resClosed, resRanked] = await Promise.all([
          fetch(urls.OPEN, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(urls.CLOSED, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(urls.RANKED, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const dataOpen = await resOpen.json();
        const dataClosed = await resClosed.json();
        const dataRanked = await resRanked.json();

        const listOpen = Array.isArray(dataOpen) ? dataOpen : dataOpen.content || [];
        const listClosed = Array.isArray(dataClosed) ? dataClosed : dataClosed.content || [];
        const listRanked = Array.isArray(dataRanked) ? dataRanked : dataRanked.content || [];

        setRecruitments([...listOpen, ...listClosed, ...listRanked]);
      } else {
        const response = await fetch(urls[status], {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const finalData = Array.isArray(data) ? data : data.content || [];
        setRecruitments(finalData);
      }
    } catch (error) {
      console.error("Błąd pobierania:", error);
      setRecruitments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchData(activeTab);
  }, [activeTab, token, navigate]);

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={headerFlexStyle}>
          <h1 style={titleStyle}>Zarządzanie Rekrutacjami</h1>
          <button onClick={() => navigate("/admin/create-job")} style={addBtnStyle}>
            + Dodaj nową ofertę
          </button>
        </div>

        <div style={tabsContainerStyle}>
          {["OPEN", "RANKED", "CLOSED", "ALL"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={activeTab === tab ? activeTabStyle : tabStyle}
            >
              {tab === "OPEN" ? "Aktualne" : tab === "RANKED" ? "Ranked" : tab === "CLOSED" ? "Zakończone" : "Wszystkie"}
            </button>
          ))}
        </div>

        <div style={tableCardStyle}>
          {loading ? (
            <div style={loadingStyle}>Ładowanie danych...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={tableHeaderRowStyle}>
                  <th style={thStyle}>Tytuł</th>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Lokalizacja</th>
                  <th style={thStyle}>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {recruitments.map((item) => (
                  <tr key={item.id} style={trStyle}>
                    <td style={tdStyle}><strong>{item.title}</strong></td>
                    <td style={tdStyle}>{item.recruitmentIdString}</td>
                    <td style={tdStyle}>
                      <span style={
                        item.status === "OPEN" ? statusOpenStyle : 
                        item.status === "RANKED" ? statusRankedStyle : 
                        item.status === "ARCHIVED" ? statusArchivedStyle :
                        statusClosedStyle
                      }>
                        {item.status}
                      </span>
                    </td>
                    <td style={tdStyle}>{item.location}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => navigate(`/admin/recruitment/${item.id}/candidates`, {
                            state: { 
                              jobTitle: item.title,
                              isFromRanked: item.status === "RANKED",
                              isArchived: item.status === "ARCHIVED" || item.status === "CLOSED"
                            }
                        })}
                        style={actionBtnStyle}
                      >
                        Kandydaci
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const containerStyle = { backgroundColor: "#f4f7f9", minHeight: "100vh", padding: "40px 20px" };
const headerFlexStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" };
const titleStyle = { color: "#00285e", fontSize: "26px", margin: 0 };
const addBtnStyle = { backgroundColor: "#ff5a00", color: "white", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" };
const tabsContainerStyle = { display: "flex", gap: "5px", marginBottom: "20px", borderBottom: "1px solid #e2e8f0" };
const tabStyle = { padding: "12px 25px", border: "none", background: "none", cursor: "pointer", color: "#718096", fontWeight: "bold" };
const activeTabStyle = { ...tabStyle, color: "#004a99", borderBottom: "3px solid #004a99" };
const tableCardStyle = { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", overflow: "hidden" };
const tableHeaderRowStyle = { textAlign: "left", borderBottom: "2px solid #edf2f7" };
const thStyle = { padding: "15px 20px", color: "#4a5568", fontSize: "14px" };
const tdStyle = { padding: "15px 20px", borderBottom: "1px solid #f7fafc", fontSize: "14px" };
const trStyle = { transition: "background 0.2s" };
const actionBtnStyle = { background: "#f0f4f8", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", color: "#004a99", fontWeight: "bold" };
const statusOpenStyle = { backgroundColor: "#c6f6d5", color: "#22543d", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
const statusClosedStyle = { backgroundColor: "#fed7d7", color: "#822727", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
const statusRankedStyle = { backgroundColor: "#e2e8f0", color: "#2d3748", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", border: "1px solid #cbd5e0" };
const statusArchivedStyle = { backgroundColor: "#cbd5e0", color: "#4a5568", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
const loadingStyle = { textAlign: "center", padding: "40px" };

export default AdminRecruitmentManager;