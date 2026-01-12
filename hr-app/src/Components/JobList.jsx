import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [pageData, setPageData] = useState({
    content: [],
    totalPages: 0,
    number: 0,
  });
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = (page = 0) => {
    setLoading(true);
    fetch(
      `http://localhost:8080/candidate/recruitments-to-apply?page=${page}&size=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setPageData({
          content: data.content,
          totalPages: data.page.totalPages,
          number: data.page.number,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd:", err);
        setLoading(false);
      });
  };

  useEffect(() => fetchJobs(0), []);

  return (
    <div
      style={{
        backgroundColor: "#f4f7f9",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "#00285e",
              fontSize: "24px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Wybierz pracę idealną dla Ciebie
          </h1>
          <span style={{ color: "#718096", fontSize: "14px" }}>
            Znaleźliśmy {pageData.content.length} ofert na tej stronie
          </span>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px",
              color: "#004a99",
              fontWeight: "bold",
            }}
          >
            Ładowanie ofert...
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {pageData.content.map((job) => (
              <div
                key={job.id}
                onMouseEnter={() => setHoveredId(job.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  ...cardStyle,
                  transform: hoveredId === job.id ? "translateY(-4px)" : "none",
                  boxShadow:
                    hoveredId === job.id
                      ? "0 10px 15px -3px rgba(0,0,0,0.1)"
                      : "0 1px 3px rgba(0,0,0,0.05)",
                  borderLeft:
                    hoveredId === job.id
                      ? "6px solid #ff5a00"
                      : "6px solid transparent",
                }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={logoPlaceholderStyle}>{job.title.charAt(0)}</div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <h2 style={titleStyle}>{job.title}</h2>
                      <div style={salaryStyle}>
                        {job.salaryMin
                          ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${
                              job.currency
                            }`
                          : "Zapytaj o płacę"}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        color: "#4a5568",
                        fontSize: "14px",
                        marginBottom: "12px",
                      }}
                    >
                      <span>🏢 {job.recruiterName || "Firma IT"}</span>
                      <span>📍 {job.location}</span>
                    </div>

                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      <span style={tagStyle}>{job.experienceLevel}</span>
                      <span style={tagStyle}>{job.contractType}</span>
                      {job.id % 2 === 0 && (
                        <span style={newBadgeStyle}>NOWA</span>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => navigate(`/job/${job.id}`)}
                    style={applyButtonStyle}
                  >
                    Szczegóły
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginacja w stylu Pracuj.pl */}
        <div style={paginationContainerStyle}>
          <button
            disabled={pageData.number === 0 || loading}
            onClick={() => fetchJobs(pageData.number - 1)}
            style={navBtnStyle}
          >
            {"< Poprzednia"}
          </button>

          <div style={{ fontWeight: "bold", color: "#00285e" }}>
            {pageData.number + 1} / {pageData.totalPages}
          </div>

          <button
            disabled={pageData.number + 1 >= pageData.totalPages || loading}
            onClick={() => fetchJobs(pageData.number + 1)}
            style={navBtnStyle}
          >
            {"Następna >"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLE ---

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "24px",
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
  position: "relative",
};

const logoPlaceholderStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#cbd5e0",
};

const titleStyle = {
  margin: 0,
  fontSize: "20px",
  color: "#004a99",
  fontWeight: "600",
};

const salaryStyle = {
  color: "#2d3748",
  fontWeight: "bold",
  fontSize: "16px",
};

const tagStyle = {
  backgroundColor: "#f7fafc",
  color: "#4a5568",
  padding: "4px 12px",
  borderRadius: "4px",
  fontSize: "12px",
  border: "1px solid #e2e8f0",
};

const newBadgeStyle = {
  backgroundColor: "#ff5a00",
  color: "white",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "10px",
  fontWeight: "bold",
};

const applyButtonStyle = {
  backgroundColor: "#004a99",
  color: "white",
  border: "none",
  padding: "10px 24px",
  borderRadius: "4px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background 0.2s",
};

const paginationContainerStyle = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  alignItems: "center",
};

const navBtnStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "1px solid #004a99",
  backgroundColor: "transparent",
  color: "#004a99",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
};

export default JobList;
