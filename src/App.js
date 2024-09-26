import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginRegisterPage from './pages/LoginRegisterPage';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
import Teams from './pages/Teams';
import TeamMembers from './pages/TeamMembers';
import TeamLeads from './pages/TeamLeads';
import TeamProjects from './pages/TeamProjects';
import Projects from './pages/Projects';
import ProjectMembers from './pages/ProjectMembers';
import NewsEditor from './pages/NewsEditor';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if user is authenticated

  // Check authentication status when the app mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // If there's a token, the user is authenticated
  }, []);

  return (
    <Router>
  <div className="flex">
    {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
    <div className="flex-grow">
      <Routes>
        <Route path="/" element={<LoginRegisterPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/members" element={<TeamMembers />} />
        <Route path="/teams/leads" element={<TeamLeads />} />
        <Route path="/teams/projects" element={<TeamProjects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/members" element={<ProjectMembers />} />
        <Route path="/newseditor" element={<NewsEditor/>} />
      </Routes>
    </div>
  </div>
</Router>

  );
}

export default App;
