import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Upewnij się, że ścieżki i nazwy plików są identyczne jak na dysku
import Header from './Components/Header';
import Footer from './Components/Footer';
import JobList from './Components/JobList';
import ApplicationForm from './Components/ApplicationForm';
import Register from './Components/Register';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/apply/:jobId" element={<ApplicationForm />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;