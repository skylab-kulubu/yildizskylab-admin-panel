import React, { useState, useRef } from "react";
import { registerUser } from "../services/usersService";

const Register = () => {
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const universityRef = useRef();
  const departmentRef = useRef();
  const birthRef = useRef();
  const roleRef = useRef();
  const activeRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const convertDateToISO = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş alan kontrolü
    if (
      !nameRef.current.value ||
      !lastNameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value ||
      !phoneRef.current.value ||
      !universityRef.current.value ||
      !departmentRef.current.value ||
      !birthRef.current.value ||
      !roleRef.current.value
    ) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const user = {
      name: nameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      telephone_number: phoneRef.current.value,
      university: universityRef.current.value,
      department: departmentRef.current.value,
      date_of_birth: convertDateToISO(birthRef.current.value),
      role: roleRef.current.value,
      active: activeRef.current.value,
    };

    try {
      setLoading(
        true
      ); /* API Çalışırken tekrar butona basılmasını engellemek için loading state ini devreye sokuyoruz */
      const response = await registerUser(user);

      if (response.isSuccess) {
        console.log(convertDateToISO(birthRef.current.value));
        setSuccess("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        setError("");
      } else {
        setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (err) {
      setError("Kayıt başarısız. Lütfen tekrar deneyin.");
      setSuccess("");
    } finally {
      setLoading(false); /* Register olunca engelleme işlemini bitiriyoruz */
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-[#eadaff] text-3xl font-bold mb-6 text-center">
          Kayıt Ol
        </h2>

        {/* Form yapısı onSubmit ile düzenleniyor */}
        <form onSubmit={handleSubmit} className="h-96 overflow-y-auto pr-1">
          {/* Ad */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="İsim"
              ref={nameRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Soyad */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Soyisim"
              ref={lastNameRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Email Adresi */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Şifre */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Şifre"
              ref={passwordRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Telefon Numarası */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Telefon Numarası"
              ref={phoneRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Üniversite */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Üniversite"
              ref={universityRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Bölüm */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Bölüm"
              ref={departmentRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Doğum Tarihi */}
          <div className="mb-4">
            <input
              type="date"
              ref={birthRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Kulüp Rolü  */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rol (Örn: lead)"
              ref={roleRef}
              className="w-full p-3 border border-gray-300 bg-[#1a1a1a] text-[#eadaff] placeholder-[#807b8b] rounded focus:outline-none focus:ring-2 focus:ring-[#eadaff]"
            />
          </div>
          {/* Aktif Kullanıcılık */}
          <div className="mb-6">
            <label className="inline-flex items-center text-[#eadaff]">
              <input
                type="checkbox"
                ref={activeRef}
                className="form-checkbox h-5 w-5 text-[#eadaff]"
              />
              <span className="ml-2">Aktif Kullanıcı</span>
            </label>
          </div>

          {/* Hata ve başarı mesajları */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          {/* Kayıt butonu */}
          <button
            type="submit"
            disabled={
              loading
            } /* API Çalışırken bir sürü kez basılınca register işlemini önlemek için loading state'i kuruyoruz.  */
            className="w-full bg-[#eadaff] text-[#1a1a1a] py-3 rounded-lg hover:bg-[#e0c9ff] transition duration-300 active:scale-95"
          >
            Kayıt Ol!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
