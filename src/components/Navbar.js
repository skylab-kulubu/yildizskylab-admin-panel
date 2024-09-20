import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/register" className="text-white">Kayıt Ol</Link>
        </li>
        <li>
          <Link to="/" className="text-white">Giriş Yap</Link>
        </li>
        <li>
          <Link to="/users" className="text-white">Kullanıcılar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
