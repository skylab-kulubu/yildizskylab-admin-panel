import React, { useState } from 'react';
import { registerUser } from '../services/usersService';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [role, setRole] = useState('');
  const [active, setActive] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const convertDateToISO = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş alan kontrolü
    if (!name || !lastName || !email || !password || !telephoneNumber || !university || !department || !dateOfBirth || !role) {
      setError('Lütfen tüm alanları doldurunuz.');
      return;
    }

    const user = {
      name,
      last_name: lastName,
      email,
      password,
      telephone_number: telephoneNumber,
      university,
      department,
      date_of_birth: convertDateToISO(dateOfBirth),
      role,
      active,
    };

    try {
      const response = await registerUser(user);

      if (response.isSuccess) {
        setSuccess('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
        setError('');
      } else {
        setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      setError('Kayıt başarısız. Lütfen tekrar deneyin.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-[#eadaff] text-3xl font-bold mb-6 text-center">Kayıt Ol</h2>

        {/* Form yapısı onSubmit ile düzenleniyor */}
        <form onSubmit={handleSubmit} className="h-96 overflow-y-auto pr-1">
          <div className="mb-4">
            <input
              type="text"
              placeholder="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Soyisim"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

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

          <div className="mb-4">
            <input
              type="text"
              placeholder="Telefon Numarası"
              value={telephoneNumber}
              onChange={(e) => setTelephoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Üniversite"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Bölüm"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          <div className="mb-4">
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Rol (Örn: lead)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center text-[#eadaff]">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="form-checkbox h-5 w-5 text-[#eadaff]"
              />
              <span className="ml-2">Aktif Kullanıcı</span>
            </label>
          </div>

          {/* Hata ve başarı mesajları */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          {/* Kayıt butonu */}
          <button type="submit" className="w-full bg-[#eadaff] text-[#1a1a1a] py-3 rounded-lg hover:bg-[#e0c9ff] transition duration-300">
            Kayıt Ol!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
