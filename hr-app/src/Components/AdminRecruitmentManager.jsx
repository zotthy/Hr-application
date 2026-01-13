import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRecruitmentManager = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [activeTab, setActiveTab] = useState("OPEN"); // 'OPEN', 'CLOSED' lub 'ALL'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const fetchData = async (status) => {
    setLoading(true);
    const urls = {
      OPEN: "http://localhost:8080/admin/recruitments/open",
      CLOSED: "http://localhost:8080/admin/recruitments/closed",
    };

    try {
      if (status === "ALL") {
        const [resOpen, resClosed] = await Promise.all([
          fetch(urls.OPEN, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(urls.CLOSED, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const dataOpen = await resOpen.json();
        const dataClosed = await resClosed.json();

        // Sprawdzamy czy dane są w .content (jeśli backend używa Page) czy bezpośrednio
        const listOpen = Array.isArray(dataOpen)
          ? dataOpen
          : dataOpen.content || [];
        const listClosed = Array.isArray(dataClosed)
          ? dataClosed
          : dataClosed.content || [];

        setRecruitments([...listOpen, ...listClosed]);
      } else {
        const response = await fetch(urls[status], {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        // ZABEZPIECZENIE: wyciągamy tablicę z pola content lub sprawdzamy czy data to tablica
        const finalData = Array.isArray(data) ? data : data.content || [];
        setRecruitments(finalData);
      }
    } catch (error) {
      console.error("Błąd pobierania:", error);
      setRecruitments([]); // W razie błędu ustawiamy pustą tablicę, żeby .map nie wywalił apki
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchData(activeTab);
  }, [activeTab, token, navigate]);

  return (
    <div
      style={{
        backgroundColor: "#f4f7f9",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ color: "#00285e", fontSize: "26px" }}>
            Zarządzanie Rekrutacjami
          </h1>
          <button
            onClick={() => navigate("/admin/create-job")}
            style={addBtnStyle}
          >
            + Dodaj nową ofertę
          </button>
        </div>

        {/* Zakładki (Tabs) */}
        <div style={tabsContainerStyle}>
          <button
            onClick={() => setActiveTab("OPEN")}
            style={activeTab === "OPEN" ? activeTabStyle : tabStyle}
          >
            Aktualne
          </button>
          <button
            onClick={() => setActiveTab("CLOSED")}
            style={activeTab === "CLOSED" ? activeTabStyle : tabStyle}
          >
            Zakończone
          </button>
          <button
            onClick={() => setActiveTab("ALL")}
            style={activeTab === "ALL" ? activeTabStyle : tabStyle}
          >
            Wszystkie
          </button>
        </div>

        {/* Tabela / Lista */}
        <div style={tableCardStyle}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              Ładowanie danych...
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    textAlign: "left",
                    borderBottom: "2px solid #edf2f7",
                  }}
                >
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
                    <td style={tdStyle}>
                      <strong>{item.title}</strong>
                    </td>
                    <td style={tdStyle}>{item.recruitmentIdString}</td>
                    <td style={tdStyle}>
                      <span
                        style={
                          item.status === "OPEN"
                            ? statusOpenStyle
                            : statusClosedStyle
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={tdStyle}>{item.location}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() =>
                          navigate(`/admin/recruitment/${item.id}/candidates`, {
                            state: { jobTitle: item.title }
                          })
                        }
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

// --- STYLE ---
const addBtnStyle = {
  backgroundColor: "#ff5a00",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};
const tabsContainerStyle = {
  display: "flex",
  gap: "5px",
  marginBottom: "20px",
  borderBottom: "1px solid #e2e8f0",
};
const tabStyle = {
  padding: "12px 25px",
  border: "none",
  background: "none",
  cursor: "pointer",
  color: "#718096",
  fontWeight: "bold",
};
const activeTabStyle = {
  ...tabStyle,
  color: "#004a99",
  borderBottom: "3px solid #004a99",
};
const tableCardStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  overflow: "hidden",
};
const thStyle = { padding: "15px 20px", color: "#4a5568", fontSize: "14px" };
const tdStyle = {
  padding: "15px 20px",
  borderBottom: "1px solid #f7fafc",
  fontSize: "14px",
};
const trStyle = {
  transition: "background 0.2s",
  ":hover": { backgroundColor: "#f8fafc" },
};
const actionBtnStyle = {
  background: "#f0f4f8",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  color: "#004a99",
  fontWeight: "bold",
};
const statusOpenStyle = {
  backgroundColor: "#c6f6d5",
  color: "#22543d",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "bold",
};
const statusClosedStyle = {
  backgroundColor: "#fed7d7",
  color: "#822727",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "bold",
};

export default AdminRecruitmentManager;
