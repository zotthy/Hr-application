import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  
  // Stan na dane użytkownika
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/account/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Jeśli token wygasł lub jest błędny
          handleLogout();
        }
      } catch (err) {
        setError("Nie udało się pobrać danych profilu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Ładowanie profilu...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;
  if (!userData) return null;

  return (
    <div style={{ backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Górny panel */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ color: '#00285e', margin: 0 }}>Mój Profil</h1>
            <p style={{ color: '#718096', marginTop: '5px' }}>Witaj ponownie, {userData.username}</p>
          </div>
          <button onClick={handleLogout} style={logoutBtnStyle}>Wyloguj się</button>
        </div>

        {/* Treść profilu */}
        <div style={gridStyle}>
          {/* Karta 1: Dane osobowe */}
          <div style={cardStyle}>
            <h3 style={sectionTitle}>Dane konta</h3>
            <div style={{ lineHeight: '2.2' }}>
              <div><strong style={labelStyle}>Nazwa użytkownika:</strong> {userData.username}</div>
              <div><strong style={labelStyle}>Email:</strong> {userData.email}</div>
            </div>
          </div>

          {/* Karta 2: Informacje o firmie (wyświetlane jeśli rola to rekruter/admin) */}
          <div style={cardStyle}>
            <h3 style={sectionTitle}>Przynależność</h3>
            <div style={{ lineHeight: '2.2' }}>
              <div><strong style={labelStyle}>Firma:</strong> {userData.companyName || 'Brak przypisanej firmy'}</div>
              <div><strong style={labelStyle}>Status konta:</strong> <span style={{ color: '#38a169', fontWeight: 'bold' }}>● Aktywne</span></div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
               <button 
                onClick={() => navigate('/admin/recruitments')} 
                style={actionBtnStyle}
               >
                 Zarządzaj rekrutacjami
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLE ---
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
const logoutBtnStyle = { backgroundColor: 'white', border: '1px solid #e53e3e', color: '#e53e3e', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', transition: '0.2s' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' };
const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' };
const sectionTitle = { color: '#00285e', fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid #edf2f7', paddingBottom: '10px', fontWeight: '700' };
const labelStyle = { color: '#4a5568', marginRight: '5px' };
const roleBadgeStyle = { backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '2px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', marginLeft: '5px' };
const actionBtnStyle = { width: '100%', backgroundColor: '#004a99', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' };

export default Profile;