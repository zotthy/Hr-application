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
    if (!token) navigate('/login');
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 1. Walidacja lokalizacji (litery, spacje, myślniki, polskie znaki)
    if (name === "location") {
      const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]*$/;
      if (!regex.test(value)) return;
    }

    // 2. Walidacja zarobków (blokada liczb ujemnych przy wpisywaniu)
    if (name === "salaryMin" || name === "salaryMax") {
      if (value !== "" && parseInt(value) < 0) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // --- WALIDACJA LOGICZNA PRZED WYŚLANIEM ---
    const sMin = parseInt(formData.salaryMin);
    const sMax = parseInt(formData.salaryMax);

    // Sprawdzenie relacji Min-Max
    if (sMin && sMax && sMin > sMax) {
      setMessage({ type: 'error', text: 'BŁĄD: Pensja minimalna nie może być wyższa od maksymalnej!' });
      setLoading(false);
      return;
    }

    // Sprawdzenie długości nazwy miejscowości
    if (formData.location.trim().length < 2) {
      setMessage({ type: 'error', text: 'BŁĄD: Podaj poprawną nazwę miasta (min. 2 znaki).' });
      setLoading(false);
      return;
    }

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
        setTimeout(() => navigate('/admin/recruitments'), 1500);
      } else {
        setMessage({ type: 'error', text: 'Błąd podczas tworzenia oferty. Sprawdź poprawność danych.' });
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
        <h2 style={headerStyle}>Dodaj nową ofertę pracy</h2>

        {message.text && (
          <div style={{ 
            padding: '15px', borderRadius: '8px', marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#c6f6d5' : '#fed7d7',
            color: message.type === 'success' ? '#22543d' : '#822727',
            fontWeight: 'bold', border: '1px solid'
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={gridFormStyle}>
          <div style={columnStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>ID Rekrutacji</label>
              <input type="text" name="recruitmentIdString" value={formData.recruitmentIdString} style={inputStyle} onChange={handleChange} required placeholder="np. REC-001" />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Tytuł stanowiska</label>
              <input type="text" name="title" value={formData.title} style={inputStyle} onChange={handleChange} required />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Lokalizacja</label>
              <input 
                type="text" 
                name="location" 
                list="popular-cities" // Podpięcie listy podpowiedzi
                value={formData.location} 
                style={inputStyle} 
                onChange={handleChange} 
                required 
                placeholder="np. Warszawa"
              />
              <datalist id="popular-cities">
                <option value="Warszawa" />
                <option value="Kraków" />
                <option value="Wrocław" />
                <option value="Poznań" />
                <option value="Gdańsk" />
                <option value="Łódź" />
                <option value="Katowice" />
                <option value="Szczecin" />
                <option value="Lublin" />
                <option value="Zdalnie" />
              </datalist>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Salary Min</label>
                <input type="number" name="salaryMin" value={formData.salaryMin} style={inputStyle} onChange={handleChange} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Salary Max</label>
                <input type="number" name="salaryMax" value={formData.salaryMax} style={inputStyle} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div style={columnStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Poziom doświadczenia</label>
              <select name="experienceLevel" value={formData.experienceLevel} style={inputStyle} onChange={handleChange}>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Rodzaj umowy</label>
              <select name="contractType" value={formData.contractType} style={inputStyle} onChange={handleChange}>
                <option value="B2B">B2B</option>
                <option value="UoP">Umowa o Pracę</option>
                <option value="UZ">Umowa Zlecenie</option>
              </select>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Opis stanowiska</label>
            <textarea name="description" value={formData.description} style={{ ...inputStyle, height: '120px', resize: 'vertical' }} onChange={handleChange} required />
          </div>

          <div style={{ gridColumn: '1 / -1', textAlign: 'right', marginTop: '20px' }}>
            <button type="button" onClick={() => navigate(-1)} style={cancelBtnStyle}>Anuluj</button>
            <button type="submit" disabled={loading} style={submitBtnStyle}>
              {loading ? 'Przetwarzanie...' : 'Opublikuj ofertę'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- STYLE ---
const formContainerStyle = { maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' };
const headerStyle = { color: '#00285e', marginBottom: '30px', borderBottom: '2px solid #ff5a00', paddingBottom: '10px', fontSize: '24px' };
const gridFormStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' };
const columnStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '14px', fontWeight: 'bold', color: '#4a5568' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '15px', transition: 'border 0.2s' };
const submitBtnStyle = { backgroundColor: '#ff5a00', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' };
const cancelBtnStyle = { marginRight: '15px', padding: '12px 25px', border: 'none', background: 'none', cursor: 'pointer', color: '#718096', fontWeight: '600' };

export default AdminCreateRecruitment;