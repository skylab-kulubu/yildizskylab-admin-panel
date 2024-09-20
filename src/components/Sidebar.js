import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaProjectDiagram, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  // Logout function to remove token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    navigate('/'); // Redirect to login page
    window.location.reload(); // Force page reload to clear all states
  };

  return (
    <div className="w-64 bg-[#1a1a1a] h-screen p-6 text-[#EADAFF] flex flex-col shadow-lg">
      {/* Sidebar Title */}
      <h1 className="text-2xl font-bold mb-8">SKY LAB PANEL</h1>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <Link to="/users" className="flex items-center space-x-2 hover:text-gray-400">
          <FaUsers />
          <span>Kullanıcılar</span>
        </Link>
        <Link to="/teams" className="flex items-center space-x-2 hover:text-gray-400">
          <FaUserFriends />
          <span>Takımlar</span>
        </Link>
        <Link to="/projects" className="flex items-center space-x-2 hover:text-gray-400">
          <FaProjectDiagram />
          <span>Projeler</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 mt-auto text-red-500 hover:text-red-600"
      >
        <FaSignOutAlt />
        <span>Çıkış Yap</span>
      </button>
    </div>
  );
};

export default Sidebar;
