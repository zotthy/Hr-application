import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importy komponentów
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import JobList from "./Components/JobList";
import ApplicationForm from "./Components/ApplicationForm"; // Tutaj jest Twoja definicja
import Register from "./Components/Register";
import JobDetails from "./Components/JobDetails";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import AdminCreateRecruitment from "./Components/AdminCreateRecruitment";
import AdminCandidateList from "./Components/AdminCandidateList";
import AdminRecruitmentManager from "./Components/AdminRecruitmentManager";

function App() {
  return (
    <Router>
      <Header /> 
    
      <main style={{ minHeight: '80vh' }}>\

        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/job/:recruitmentId" element={<JobDetails />} />
          <Route path="/apply/:recruitmentId" element={<ApplicationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/create-job" element={<AdminCreateRecruitment />} />
          <Route path="/admin/recruitments" element={<AdminRecruitmentManager />} />
          <Route path="/admin/recruitment/:id/candidates" element={<AdminCandidateList />} />
        </Routes>

      </main>

      <Footer />
    </Router>
  );
}

export default App;