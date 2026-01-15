import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <button onClick={() => navigate(-1)} style={backBtn}>← Wróć</button>
        <h1 style={{ color: '#00285e' }}>Regulamin Serwisu</h1>
        <p style={{ color: '#718096' }}>Obowiązuje od: 1 stycznia 2026</p>
        
        <div style={sectionStyle}>
          <h3>§1 Postanowienia ogólne</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc scelerisque viverra mauris in aliquam sem fringilla.</p>
        </div>

        <div style={sectionStyle}>
          <h3>§2 Zasady korzystania</h3>
          <p>Viverra maecenas accumsan lacus vel facilisis. Enim sit amet venenatis urna cursus eget. Aliquam sem fringilla ut morbi tincidunt augue interdum velit.</p>
        </div>

        <div style={sectionStyle}>
          <h3>§3 Odpowiedzialność</h3>
          <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
        </div>
      </div>
    </div>
  );
};

const pageStyle = { backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '40px 20px', display: 'flex', justifyContent: 'center' };
const cardStyle = { backgroundColor: '#fff', maxWidth: '800px', width: '100%', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const backBtn = { background: 'none', border: 'none', color: '#004a99', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' };
const sectionStyle = { marginTop: '25px', color: '#4a5568', lineHeight: '1.6' };

export default TermsAndConditions;