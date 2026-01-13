import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    // Strażnik dostępu (Protected Route Logic)
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <div style={{ backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Górny panel */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ color: '#00285e', margin: 0 }}>Mój Profil</h1>
            <p style={{ color: '#718096', marginTop: '5px' }}>Witaj ponownie, {userEmail}</p>
          </div>
          <button onClick={handleLogout} style={logoutBtnStyle}>Wyloguj się</button>
        </div>

        {/* Treść profilu */}
        <div style={gridStyle}>
          <div style={cardStyle}>
            <h3 style={sectionTitle}>Dane konta</h3>
            <div style={{ lineHeight: '2' }}>
              <div><strong>Email:</strong> {userEmail}</div>
              <div><strong>Status:</strong> Kandydat</div>
              <div><strong>Konto:</strong> Aktywne</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
const logoutBtnStyle = { backgroundColor: 'white', border: '1px solid #e53e3e', color: '#e53e3e', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' };
const sectionTitle = { color: '#00285e', fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid #edf2f7', paddingBottom: '10px' };
const statBox = { backgroundColor: '#ebf8ff', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' };
const actionBtnStyle = { width: '100%', backgroundColor: '#004a99', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };

export default Profile;