import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  // Zmieniamy strukturę stanu: przechowujemy cały obiekt strony
  const [pageData, setPageData] = useState({
    content: [],
    totalPages: 0,
    number: 0, // aktualna strona
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Funkcja pobierająca dane z uwzględnieniem numeru strony
  const fetchJobs = (page = 0) => {
    setLoading(true);
    fetch(`http://localhost:8080/candidate/recruitments-to-apply?page=${page}&size=5`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania ofert');
        }
        return response.json();
      })
      .then((data) => {
        // 'data' to teraz obiekt Page, a nie tablica
        setPageData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs(0);
  }, []);

  if (loading && pageData.content.length === 0) return <div style={{ textAlign: 'center', padding: '50px' }}>Ładowanie ofert...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red', padding: '50px' }}>Błąd: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Dostępne Oferty Pracy
      </h2>
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {/* Mapujemy po pageData.content zamiast po samym jobs */}
        {pageData.content && pageData.content.map((job) => (
          <div key={job.id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={idBadgeStyle}>{job.recruitmentIdString}</span>
                <h3 style={{ margin: '10px 0', color: '#2c3e50' }}>{job.title}</h3>
              </div>
              <span style={{ 
                ...statusStyle, 
                backgroundColor: job.status === 'OPEN' ? '#e6fffa' : '#fff5f5',
                color: job.status === 'OPEN' ? '#2c7a7b' : '#c53030'
              }}>
                {job.status}
              </span>
            </div>

            <p style={{ color: '#4a5568', lineHeight: '1.5' }}>{job.description}</p>
            
            <hr style={{ border: '0', borderTop: '1px solid #edf2f7', margin: '15px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#718096' }}>
              <div>
                <strong>Rekruter:</strong> {job.user?.name || 'N/A'}
              </div>
              <div>
                <strong>Dodano:</strong> {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>

            <button 
              onClick={() => navigate(`/apply/${job.recruitmentIdString}`)} 
              style={applyButtonStyle}
            >
              Aplikuj na to stanowisko
            </button>
          </div>
        ))}
      </div>

      {/* PASEK PAGINACJI */}
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        <button 
          disabled={pageData.number === 0}
          onClick={() => fetchJobs(pageData.number - 1)}
          style={paginationButtonStyle}
        >
          Poprzednia
        </button>
        
        <span>Strona {pageData.number + 1} z {pageData.totalPages}</span>

        <button 
          disabled={pageData.number + 1 >= pageData.totalPages}
          onClick={() => fetchJobs(pageData.number + 1)}
          style={paginationButtonStyle}
        >
          Następna
        </button>
      </div>
    </div>
  );
};

// Style
const cardStyle = { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' };
const idBadgeStyle = { fontSize: '11px', backgroundColor: '#edf2f7', padding: '4px 8px', borderRadius: '4px', color: '#4a5568', fontWeight: 'bold' };
const statusStyle = { fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '999px', border: '1px solid currentColor' };
const applyButtonStyle = { marginTop: '20px', width: '100%', padding: '10px', backgroundColor: '#4299e1', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const paginationButtonStyle = { padding: '8px 16px', backgroundColor: '#edf2f7', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: (props) => props.disabled ? 0.5 : 1 };

export default JobList;