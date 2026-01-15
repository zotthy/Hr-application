import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [pageData, setPageData] = useState({
    content: [],
    totalPages: 0,
    number: 0,
  });
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const fetchJobs = useCallback((page = 0, searchKeyword = "") => {
    setLoading(true);
    let url = "";
    if (searchKeyword && searchKeyword.trim() !== "") {
      url = `http://localhost:8080/candidate/search-recruitments?keyword=${encodeURIComponent(searchKeyword)}&page=${page}&size=5`;
    } else {
      url = `http://localhost:8080/candidate/recruitments-to-apply?page=${page}&size=5`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPageData({
          content: data.content || [],
          totalPages: data.page?.totalPages || data.totalPages || 0,
          number: data.page?.number || data.number || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchJobs(0, "");
  }, [fetchJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(0, keyword);
  };

  const clearSearch = () => {
    setKeyword("");
    fetchJobs(0, "");
  };

  return (
    <div style={pageBackgroundStyle}>
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>
        
        {/* Wyszukiwarka */}
        <div style={searchSectionStyle}>
          <form onSubmit={handleSearch} style={formStyle}>
            <div style={inputWrapperStyle}>
              <span style={searchIconStyle}>🔍</span>
              <input
                type="text"
                placeholder="Stanowisko, miasto..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={searchInputStyle}
              />
              {keyword && (
                <button type="button" onClick={clearSearch} style={clearIconBtnStyle}>✕</button>
              )}
            </div>
            <button type="submit" style={mainSearchButtonStyle}>
              Szukaj ofert
            </button>
          </form>
        </div>

        <div style={headerFlexStyle}>
          <h1 style={titleStyle}>
            {keyword ? `Wyniki wyszukiwania: ${keyword}` : "Aktualne oferty pracy"}
          </h1>
          <span style={resultsCountStyle}>
            Znaleziono {pageData.content.length} ofert na tej stronie
          </span>
        </div>

        {loading ? (
          <div style={loaderStyle}>Szukamy najlepszych ofert...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {pageData.content.length > 0 ? (
              pageData.content.map((job) => (
                <div
                  key={job.id}
                  onMouseEnter={() => setHoveredId(job.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/job/${job.id}`)}
                  style={{
                    ...cardStyle,
                    transform: hoveredId === job.id ? "translateX(5px)" : "none",
                    borderColor: hoveredId === job.id ? "#004a99" : "#e2e8f0",
                    boxShadow: hoveredId === job.id ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div style={logoPlaceholderStyle}>
                        {(job.companyName || job.title).charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2 style={jobTitleStyle}>{job.title}</h2>
                        <div style={salaryTextStyle}>
                          {job.salaryMin ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}` : "Atrakcyjne wynagrodzenie"}
                        </div>
                      </div>
                      <div style={metaDataStyle}>
                        {/* WYŚWIETLANIE FIRMY I REKRUTERA */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={companyNameStyle}>🏢 {job.companyName || "Firma IT"}</span>
                          <span style={dividerStyle}>•</span>
                          <span style={recruiterStyle}>👤 {job.recruiterName}</span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <span>📍 {job.location}</span>
                          <span>📄 {job.contractType}</span>
                          <span>📊 {job.experienceLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={cardFooterStyle}>
                    <button style={detailsBtnStyle}>Zobacz szczegóły</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={noResultsStyle}>Brak ofert spełniających Twoje kryteria.</div>
            )}
          </div>
        )}

        {/* Paginacja */}
        {pageData.totalPages > 1 && (
          <div style={paginationStyle}>
            <button 
              disabled={pageData.number === 0} 
              onClick={() => fetchJobs(pageData.number - 1, keyword)}
              style={{...pageBtnStyle, opacity: pageData.number === 0 ? 0.5 : 1}}
            >
              Poprzednia
            </button>
            <div style={pageIndicatorStyle}>
              Strona <strong>{pageData.number + 1}</strong> z {pageData.totalPages}
            </div>
            <button 
              disabled={pageData.number + 1 >= pageData.totalPages} 
              onClick={() => fetchJobs(pageData.number + 1, keyword)}
              style={{...pageBtnStyle, opacity: pageData.number + 1 >= pageData.totalPages ? 0.5 : 1}}
            >
              Następna
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLE ---
const pageBackgroundStyle = { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px" };
const searchSectionStyle = { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "40px" };
const formStyle = { display: "flex", gap: "12px" };
const inputWrapperStyle = { position: "relative", flex: 1, display: "flex", alignItems: "center" };
const searchIconStyle = { position: "absolute", left: "15px", color: "#94a3b8" };
const searchInputStyle = { width: "100%", padding: "14px 45px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "16px", outline: "none" };
const clearIconBtnStyle = { position: "absolute", right: "15px", border: "none", background: "none", color: "#94a3b8", cursor: "pointer", fontSize: "18px" };
const mainSearchButtonStyle = { backgroundColor: "#ff5a00", color: "white", border: "none", padding: "0 35px", borderRadius: "8px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" };
const headerFlexStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" };
const titleStyle = { fontSize: "22px", color: "#1e293b", margin: 0, fontWeight: "800" };
const resultsCountStyle = { color: "#64748b", fontSize: "14px" };
const cardStyle = { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", transition: "all 0.3s ease", cursor: "pointer" };
const logoPlaceholderStyle = { width: "55px", height: "55px", backgroundColor: "#f1f5f9", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "bold", color: "#64748b" };
const jobTitleStyle = { margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" };
const salaryTextStyle = { color: "#059669", fontWeight: "700", fontSize: "16px" };

// Nowe style dla metadanych
const metaDataStyle = { display: "flex", flexDirection: "column", gap: "6px", color: "#64748b", fontSize: "14px", marginTop: "8px" };
const companyNameStyle = { fontWeight: "700", color: "#1e293b" };
const recruiterStyle = { fontWeight: "500", color: "#475569" };
const dividerStyle = { color: "#cbd5e0" };

const cardFooterStyle = { display: "flex", justifyContent: "flex-end", marginTop: "15px" };
const detailsBtnStyle = { backgroundColor: "#f1f5f9", color: "#0f172a", border: "none", padding: "8px 20px", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" };
const paginationStyle = { marginTop: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "24px" };
const pageBtnStyle = { padding: "10px 24px", borderRadius: "8px", border: "1px solid #004a99", backgroundColor: "#fff", color: "#004a99", fontWeight: "700", cursor: "pointer" };
const pageIndicatorStyle = { fontSize: "15px", color: "#475569" };
const loaderStyle = { textAlign: "center", padding: "100px", color: "#004a99", fontWeight: "bold" };
const noResultsStyle = { textAlign: "center", padding: "60px", backgroundColor: "#fff", borderRadius: "12px", color: "#64748b", border: "1px dashed #cbd5e0" };

export default JobList;