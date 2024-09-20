import React, { useState } from 'react';
import { loginUser } from '../services/usersService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş alan kontrolü
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurunuz.');
      return;
    }

    const credentials = { email, password };

    try {
      const response = await loginUser(credentials);
      if (response.isSuccess) {
        setSuccess('Giriş başarılı! Hoş geldiniz.');
        setError('');
      } else {
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      setError('Giriş başarısız. Lütfen tekrar deneyin.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-[#eadaff] text-3xl font-bold mb-6 text-center">Giriş Yap</h2>

        {/* Form yapısına onSubmit ekleniyor */}
        <form onSubmit={handleSubmit} className="h-96 overflow-y-auto content-center">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          {/* Hata ve başarı mesajları */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          {/* Login butonu */}
          <button type="submit" className="w-full bg-[#eadaff] text-[#1a1a1a] py-3 rounded-lg hover:bg-[#e0c9ff] transition duration-300">
            Giriş Yap!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
