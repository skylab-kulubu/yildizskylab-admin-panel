import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaProjectDiagram, FaSignOutAlt, FaUserFriends, FaNewspaper } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="w-64 bg-[#1a1a1a] h-screen p-6 text-[#EADAFF] flex flex-col shadow-lg">
      <h1 className="text-2xl font-bold mb-8">SKY LAB PANEL</h1>
      <nav className="flex flex-col space-y-4">
        {/* Existing Links */}
        <Link to="/users" className="flex items-center space-x-2 hover:text-gray-400">
          <FaUsers />
          <span>Kullanıcılar</span>
        </Link>
        <div className="flex flex-col space-y-2">
          <Link to="/teams" className="flex items-center space-x-2 hover:text-gray-400">
            <FaUserFriends />
            <span>Takımlar</span>
          </Link>
          <Link to="/teams/members" className="ml-6 hover:text-gray-400">Takım Üyeleri</Link>
          <Link to="/teams/leads" className="ml-6 hover:text-gray-400">Takım Liderleri</Link>
          <Link to="/teams/projects" className="ml-6 hover:text-gray-400">Takım Projeleri</Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link to="/projects" className="flex items-center space-x-2 hover:text-gray-400">
            <FaProjectDiagram />
            <span>Projeler</span>
          </Link>
          <Link to="/projects/members" className="ml-6 hover:text-gray-400">Proje Üyeleri</Link>
        </div>

        {/* News Editor Link */}
        <div className="flex flex-col space-y-2">
          <Link to="/newseditor" className="flex items-center space-x-2 hover:text-gray-400">
            <FaNewspaper />
            <span>Haber Editörü</span>
          </Link>
        </div>
      </nav>

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
