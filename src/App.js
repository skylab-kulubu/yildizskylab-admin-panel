import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginRegisterPage from './pages/LoginRegisterPage';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
import Teams from './pages/Teams';

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
        {/* Sidebar is visible only if the user is authenticated */}
        {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />}

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginRegisterPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/projects" element={<h1>Projects Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
