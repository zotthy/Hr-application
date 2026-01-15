import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { recruitmentId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://localhost:8080/candidate/recruitments-to-apply/${recruitmentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd:", err);
        setLoading(false);
      });
  }, [recruitmentId]);

  if (loading)
    return <div style={loaderStyle}>Ładowanie szczegółów oferty...</div>;
  if (!job) return <div style={loaderStyle}>Nie znaleziono takiej oferty.</div>;

  return (
    <div
      style={{
        backgroundColor: "#f4f7f9",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Przycisk powrotu */}
        <button onClick={() => navigate(-1)} style={backButtonStyle}>
          ← Wróć do listy ofert
        </button>

        <div style={containerStyle}>
          {/* Nagłówek oferty */}
          <div style={headerSectionStyle}>
            <div style={logoLargeStyle}>{job.title.charAt(0)}</div>
            <div style={{ flex: 1 }}>
              <h1 style={titleStyle}>{job.title}</h1>
              <p
                style={{
                  color: "#004a99",
                  fontWeight: "bold",
                  margin: "5px 0",
                }}
              >
                {job.recruiterName || "Firma IT"}
              </p>
            </div>
            <div style={salaryBadgeStyle}>
              {job.salaryMin
                ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${
                    job.currency
                  }`
                : "Płaca utajniona"}
            </div>
          </div>

          {/* Panel parametrów (Grid) */}
          <div style={infoGridStyle}>
            <div style={infoItemStyle}>
              <strong>Lokalizacja</strong>
              <span>📍 {job.location}</span>
            </div>
            <div style={infoItemStyle}>
              <strong>Umowa</strong>
              <span>📄 {job.contractType}</span>
            </div>
            <div style={infoItemStyle}>
              <strong>Poziom</strong>
              <span>🚀 {job.experienceLevel}</span>
            </div>
            <div style={infoItemStyle}>
              <strong>ID Oferty</strong>
              <span># {job.recruitmentIdString}</span>
            </div>
          </div>

          <div style={descriptionSectionStyle}>
            <h3 style={{ color: "#00285e", marginBottom: "15px" }}>
              Opis stanowiska
            </h3>
            <p
              style={{
                lineHeight: "1.8",
                color: "#4a5568",
                whiteSpace: "pre-line",
              }}
            >
              {job.description}
            </p>
          </div>
          <div style={footerActionStyle}>
            <button
              onClick={() =>
                navigate(`/apply/${job.recruitmentIdString}`, {
                  state: { numericId: job.id }, // Przekazujemy liczbę (np. 7)
                })
              }
              style={applyLargeButtonStyle}
            >
              Aplikuj na to stanowisko
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLE ---
const containerStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};
const headerSectionStyle = {
  padding: "40px",
  borderBottom: "1px solid #edf2f7",
  display: "flex",
  alignItems: "center",
  gap: "25px",
  backgroundColor: "#fff",
};
const logoLargeStyle = {
  width: "80px",
  height: "80px",
  backgroundColor: "#004a99",
  color: "white",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  fontWeight: "bold",
};
const titleStyle = { margin: 0, fontSize: "28px", color: "#00285e" };
const salaryBadgeStyle = {
  backgroundColor: "#e6fffa",
  color: "#2c7a7b",
  padding: "15px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "18px",
};
const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  padding: "20px 40px",
  backgroundColor: "#fcfcfc",
  borderBottom: "1px solid #edf2f7",
};
const infoItemStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  fontSize: "14px",
  color: "#718096",
};
const descriptionSectionStyle = { padding: "40px" };
const footerActionStyle = {
  padding: "30px 40px",
  backgroundColor: "#f8fafc",
  textAlign: "center",
};
const applyLargeButtonStyle = {
  backgroundColor: "#ff5a00",
  color: "white",
  border: "none",
  padding: "16px 60px",
  borderRadius: "8px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.2s",
};
const backButtonStyle = {
  background: "none",
  border: "none",
  color: "#004a99",
  cursor: "pointer",
  fontWeight: "bold",
  marginBottom: "20px",
};
const loaderStyle = {
  textAlign: "center",
  padding: "100px",
  fontSize: "18px",
  color: "#718096",
};

export default JobDetails;
