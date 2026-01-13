import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCreateRecruitment = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const [formData, setFormData] = useState({
    recruitmentIdString: '',
    title: '',
    description: '',
    status: 'OPEN',
    location: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'PLN',
    contractType: 'B2B',
    experienceLevel: 'Mid'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:8080/admin/createRecruitment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Oferta została utworzona pomyślnie!' });
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage({ type: 'error', text: 'Błąd podczas tworzenia oferty. Sprawdź uprawnienia.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Błąd połączenia z serwerem.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={formContainerStyle}>
        <h2 style={{ color: '#00285e', marginBottom: '30px', borderBottom: '2px solid #ff5a00', paddingBottom: '10px' }}>
          Dodaj nową ofertę pracy
        </h2>

        {message.text && (
          <div style={{ 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#c6f6d5' : '#fed7d7',
            color: message.type === 'success' ? '#22543d' : '#822727'
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={gridFormStyle}>
          {/* Lewa kolumna */}
          <div style={columnStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>ID Rekrutacji (np. REC-2026-01)</label>
              <input type="text" name="recruitmentIdString" style={inputStyle} onChange={handleChange} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Tytuł stanowiska</label>
              <input type="text" name="title" style={inputStyle} onChange={handleChange} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Lokalizacja</label>
              <input type="text" name="location" style={inputStyle} onChange={handleChange} required />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Salary Min</label>
                <input type="number" name="salaryMin" style={inputStyle} onChange={handleChange} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Salary Max</label>
                <input type="number" name="salaryMax" style={inputStyle} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Prawa kolumna */}
          <div style={columnStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Poziom doświadczenia</label>
              <select name="experienceLevel" style={inputStyle} onChange={handleChange}>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Rodzaj umowy</label>
              <select name="contractType" style={inputStyle} onChange={handleChange}>
                <option value="B2B">B2B</option>
                <option value="UoP">Umowa o Pracę</option>
                <option value="UZ">Umowa Zlecenie</option>
              </select>
            </div>

          </div>

          {/* Pełna szerokość - Opis */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Opis stanowiska</label>
            <textarea 
              name="description" 
              style={{ ...inputStyle, height: '150px', resize: 'vertical' }} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>

          <div style={{ gridColumn: '1 / -1', textAlign: 'right', marginTop: '20px' }}>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              style={{ marginRight: '15px', padding: '12px 25px', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              Anuluj
            </button>
            <button 
              type="submit" 
              disabled={loading}
              style={submitBtnStyle}
            >
              {loading ? 'Tworzenie...' : 'Opublikuj ofertę'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- STYLE ---
const formContainerStyle = { maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const gridFormStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const columnStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '5px' };
const labelStyle = { fontSize: '14px', fontWeight: 'bold', color: '#4a5568' };
const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none' };
const submitBtnStyle = { backgroundColor: '#ff5a00', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' };

export default AdminCreateRecruitment;